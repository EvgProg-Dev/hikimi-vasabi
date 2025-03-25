import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./Slider.module.css";

import logo from "./../../assets/logo-white.png";

import slide1 from "./../../assets/slider/slide1.jpg";
import slide2 from "./../../assets/slider/slide2.jpg";

const MySlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: false,
        beforeChange: (_: number, next: number) => {
            document
                .querySelectorAll(".slick-slide")
                .forEach((slide, index) => {
                    if (index !== next) {
                        slide.setAttribute("inert", "");
                    } else {
                        slide.removeAttribute("inert");
                    }
                });
        },
    };

    return (
        <div className={style.sliderContainer}>
            <Slider {...settings}>
                <div className={style.slide}>
                    <img className={style.image} src={slide1} alt="Slide 1" />
                    <img
                        className={style.logo__image}
                        src={logo}
                        alt="Логотип Hikimi Vasabi"
                    />
                    {/* Hikimi Vasabi - Суші шоп в Кременчуці */}
                </div>
                <div className={style.slide}>
                    <img className={style.image} src={slide2} alt="Slide 2" />
                    <h2 className={style.title__slide}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sapiente dolorem totam repudiandae.
                    </h2>
                </div>

                <div className={style.slide}>
                    <img className={style.image} src={slide1} alt="Slide 3" />
                    <h2 className={style.title__slide}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Sapiente dolorem totam repudiandae.
                    </h2>
                </div>
            </Slider>
        </div>
    );
};

export default MySlider;
