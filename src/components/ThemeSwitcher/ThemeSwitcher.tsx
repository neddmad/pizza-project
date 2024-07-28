import { ReactComponent as MoonIcon } from "../assets/themeChangerIcons/icon-moon.svg";
import { ReactComponent as SunIcon } from "../assets/themeChangerIcons/icon-sun.svg";
import styles from "./ThemeSwitcher.module.scss";
import { useEffect, useState } from "react";

function ThemeSwitcher() {
  const [isDark, setDark] = useState<string>("light");
  const changeColorTheme = (isDark: string) => {
    return isDark === "light" ? setDark("dark") : setDark("light");
  };
  const themeText = isDark;
  const ThemeIcon = isDark === "light" ? SunIcon : MoonIcon;

  useEffect(() => {
    document.body.setAttribute(
      "data-theme",
      isDark === "dark" ? "dark" : "light"
    );
  }, [isDark]);
  return (
    <div className={styles.switcher} onClick={() => changeColorTheme(isDark)}>
      <span>{themeText}</span>
      <ThemeIcon className={styles.icon} />
    </div>
  );
}

export default ThemeSwitcher;
