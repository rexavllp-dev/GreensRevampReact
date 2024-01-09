import React from "react";
import Slider from "react-slick";
import "./slick.css";
import "./slick-theme.css";
import Image from "next/image";
import { Category1, categoryImg2, companyLogo } from "../../../public/images";

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
    };

    return (
        <div>
            <h2> Simple Slider </h2>
            <Slider {...settings}>
                <div>
                  <Image src={categoryImg2} />
                </div>
                <div>
                  <Image src={categoryImg2} />
                </div>
                <div>
                  <Image src={categoryImg2} />
                </div>
                <div>
                  <Image src={categoryImg2} />
                </div>
                <div>
                  <Image src={categoryImg2} />
                </div>
               
            </Slider>
        </div>
    );
};

export default SimpleSlider;