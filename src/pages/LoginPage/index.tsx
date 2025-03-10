import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { RootState, useAppDispatch } from "../../redux/store";
import { fetchAuth } from "../../redux/slices/authSlice";
import { AuthParams } from "src/types";

import style from "./LoginPage.module.css";
import { toast } from "react-toastify";

const Login: FC = () => {
    const isAuth = useSelector((state: RootState) => Boolean(state.auth.data));

    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: "",
            password: "",
        },
        mode: "onChange",
    });

    const onSubmit = async (values: AuthParams) => {
        const { payload } = await dispatch(fetchAuth(values));

        if (!payload || typeof payload === "string") {
            return toast.error("Невірний логін або пароль!");
        }

        if ("token" in payload) {
            window.localStorage.setItem("token", payload.token);
        }
    };

    useEffect(() => {
        if (isAuth) {
            toast.success("Вхід виконано успішно!");
        }
    }, [isAuth]);

    if (isAuth) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <Helmet>
                <title>Hikimi Vasabi - Вхід</title>
            </Helmet>

            <div className={style.login__container}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className={style.login__form}
                >
                    <h2>Sign In</h2>
                    <div className={style.input__group}>
                        <label>
                            Login{" "}
                            <span className={style.login__error}>
                                {errors.login?.message}
                            </span>
                        </label>
                        <input
                            {...register("login", {
                                required: "This field is required!",
                            })}
                            placeholder="Enter your login"
                            type="text"
                            required
                        />
                    </div>
                    <div className={style.input__group}>
                        <label>
                            Password{" "}
                            <span className={style.login__error}>
                                {errors.login?.message}
                            </span>
                        </label>
                        <input
                            {...register("password", {
                                required: "This field is required!",
                            })}
                            placeholder="Enter your password"
                            type="password"
                            required
                        />
                        <span className={style.login__error}>
                            {errors.password?.message}
                        </span>
                    </div>
                    <button type="submit">Sign In</button>
                </form>
            </div>
        </>
    );
};

export default Login;
