import LunchDiningIcon from "@mui/icons-material/LunchDining";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import { useAppSelector } from "../../app/hooks";
import { Audio } from "react-loader-spinner";
import Checkout from "../Checkout/Checkout";
import styles from "./Main.module.scss";
import Drinks from "../Drinks/Drinks";
import Slider from "../Slider/Slider";
import { useEffect } from "react";
import Pizza from "../Pizza/Pizza";
import Salat from "../Salat/Salat";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Carrer from "../Career/Carrer";

function Main() {
  const dataFetchingState = useAppSelector((state) => state.data);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  if (dataFetchingState.error) {
    return <div>Помилка : {dataFetchingState.error}</div>;
  } else if (!dataFetchingState.isLoaded) {
    return (
      <div>
        <Audio
          height="60"
          width="60"
          color="green"
          ariaLabel="loading"
          wrapperStyle={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      </div>
    );
  } else if(pathname === '/carrer'){
    return (
      <Carrer/>
    )
  } else if(pathname === '/checkout'){
    return(
      <Checkout/>
    )
  } else {
    return (
      <div>
        <div className={styles.menuIcons}>
          <Link
            className={pathname === "/pizza" ? styles.styleGray : styles.icons}
            to="/pizza"
          >
            <LocalPizzaIcon />
          </Link>
          <Link
            className={pathname === "/salat" ? styles.styleGray : styles.icons}
            to="/salat"
          >
            <LunchDiningIcon />
          </Link>
          <Link
            className={pathname === "/drinks" ? styles.styleGray : styles.icons}
            to="/drinks"
          >
            <LocalBarIcon />
          </Link>
        </div>
        <Routes>
          <Route path="*" element={<Slider />} />
          <Route path="/pizza" element={<Pizza />} />
          <Route path="/salat" element={<Salat />} />
          <Route path="/drinks" element={<Drinks />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
