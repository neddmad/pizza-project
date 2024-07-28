import secondPizza from "../assets/sliderPhotos/2.jpg";
import firstPizza from "../assets/sliderPhotos/1.jpg";
import thirdPizza from "../assets/sliderPhotos/3.jpg";
import forthPizza from "../assets/sliderPhotos/4.jpg";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slider.module.scss";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

function SliderComp() {
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div className={styles.container}>
      <Slider {...settings}>
        <div>
          <img src={firstPizza} />
        </div>
        <div>
          <img src={secondPizza} />
        </div>
        <div>
          <img src={thirdPizza} />
        </div>
        <div>
          <img src={forthPizza} />
        </div>
      </Slider>
    </div>
  );
}

export default SliderComp;
