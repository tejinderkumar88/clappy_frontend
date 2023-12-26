import React from "react";
import loginlogo from "../../assets/img/logo.png";
// import OwlCarousel from 'react-owl-carousel';
import person1 from "../../assets/img/user.png";
import carousalbg from "../../assets/img/Rectangle 14.png";
import carousalbgicon from "../../assets/img/carousalbgicon.svg";
import Slider from "react-slick";

function LoginBanner() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    return (
        <>
        <div className="logo">
            <img src={loginlogo} alt="logo" />
        </div>
        <div className="login-heading">
            <h1>The Innovative Business Management Solution.</h1>
        </div>
        <div className="login-paragraph">
            <p>
            With our platform, you can grow, manage and cordinate your business
            workflow all in one place.
            </p>
        </div>
        <div className="login-owl-carousal login-carousel">
            <Slider className="owl-theme" {...settings}>
            <div className="item owl-carousal-item">
                <p>
                Clapper s CRM platform has revolutionized our approach to customer
                relationships. Its intuitive interface and robust features have
                significantly enhanced our productivity, enabling us to better
                serve our clients. We highly recommend Clappe for their
                exceptional CRM solution
                </p>
                <div className="flex">
                <div className="carousal-person-div">
                    <div>
                    <img src={person1} alt="person1" className="person1" />
                    </div>
                    <div className="person-info">
                    <h3>Adam Shi</h3>
                    <h4>CEO at Nike LLC.</h4>{" "}
                    </div>
                </div>
                <div className="carousal-person-div">
                    <img
                    src={carousalbgicon}
                    alt="carousalbgicon"
                    className="carousalbgicon"
                    />
                </div>
                </div>
            </div>
            <div className="item owl-carousal-item">
                <p>
                Clapper s CRM platform has revolutionized our approach to customer
                relationships. Its intuitive interface and robust features have
                significantly enhanced our productivity, enabling us to better
                serve our clients. We highly recommend Clappe for their
                exceptional CRM solution
                </p>
                <div className="flex">
                <div className="carousal-person-div">
                    <div>
                    <img src={person1} alt="person1" className="person1" />
                    </div>
                    <div className="person-info">
                    <h3>Adam Shi</h3>
                    <h4>CEO at Nike LLC.</h4>{" "}
                    </div>
                </div>
                <div className="carousal-person-div">
                    <img
                    src={carousalbgicon}
                    alt="carousalbgicon"
                    className="carousalbgicon"
                    />
                </div>
                </div>
            </div>
            <div className="item owl-carousal-item">
                <p>
                Clapper s CRM platform has revolutionized our approach to customer
                relationships. Its intuitive interface and robust features have
                significantly enhanced our productivity, enabling us to better
                serve our clients. We highly recommend Clappe for their
                exceptional CRM solution
                </p>
                <div className="flex">
                <div className="carousal-person-div">
                    <div>
                    <img src={person1} alt="person1" className="person1" />
                    </div>
                    <div className="person-info">
                    <h3>Adam Shi</h3>
                    <h4>CEO at Nike LLC.</h4>{" "}
                    </div>
                </div>
                <div className="carousal-person-div">
                    <img
                    src={carousalbgicon}
                    alt="carousalbgicon"
                    className="carousalbgicon"
                    />
                </div>
                </div>
            </div>
            </Slider>
        </div>
        <img src={carousalbg} alt="carousalbg" className="carousalbg" />
        </>
    );
}

export default LoginBanner;
