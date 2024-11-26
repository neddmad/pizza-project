import googleStore from "../assets/footerIcons/google-play-badge-logo-png-transparent.png";
import appStore from "../assets/footerIcons/Download_on_the_App_Store_Badge.svg.webp";
import pizzaStatic from "../assets/footerIcons/pizzaStatic.png";
import masterCard from "../assets/footerIcons/masterCard.png";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import visa from "../assets/footerIcons/visaLogo.svg";
import { useAppSelector } from "../../app/hooks";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

function Footer() {
  const dataFetchingState = useAppSelector((state) => state.data);

  if (dataFetchingState.isLoaded) {
    return (
      <div className={styles.footerComp}>
        <div className={styles.footer}>
          <div className={styles.firstBlock}>
            <div
              style={{
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              REACT PIZZA
              <img
                style={{ width: "30px", height: "30px" }}
                src={pizzaStatic}
                alt="¯_(ツ)_/¯"
              />
            </div>
            <span>Всі права захищенні</span>
            <div>
              <a href="https://play.google.com/store/apps/" target="_blank">
                <img
                  style={{ width: "100px", height: "25px" }}
                  src={appStore}
                />
              </a>
            </div>
            <div>
              <a href="https://play.google.com/store/games" target="_blank">
                <img
                  style={{ width: "100px", height: "25px" }}
                  src={googleStore}
                />
              </a>
            </div>
          </div>
          <div className={styles.secondBlock}>
            <a href="">Новини</a>
            <Link to='/carrer'>
            <a href="">Кар'єра</a>
            </Link>
            <a href="">Франчайзинг</a>
          </div>
          <div className={styles.thirdBlock}>
            Підтримка платежів
            <a href="https://www.visa.com.ua/uk_UA">
              <img style={{ width: "100px", height: "50px" }} src={visa} />
            </a>
            <a href="https://www.mastercard.ua/uk-ua.html">
              <img style={{ width: "80px", height: "50px" }} src={masterCard} />
            </a>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid white ",
          }}
        ></div>
        <div className={styles.socialMediaBlock}>
          <span>
            <a target="_blank" href="https://www.facebook.com/react/">
              <FacebookIcon />
            </a>
          </span>
          <span>
            <a
              target="_blank"
              href="https://www.instagram.com/reactjsofficial/"
            >
              <InstagramIcon />
            </a>
          </span>
          <span>
            <a
              target="_blank"
              href="https://twitter.com/reactjs?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
            >
              <TwitterIcon />
            </a>
          </span>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default Footer;
