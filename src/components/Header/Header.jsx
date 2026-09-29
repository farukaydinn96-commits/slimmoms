import s from "./Header.module.css";
import UserNav from "../UserNav/UserNav";
import UserInfo from "../UserInfo/UserInfo";
import Logo from "../Logo/Logo";
import burgerIcon from "../../assets/icons/burger.svg?url";
import closeIcon from "../../assets/icons/close.svg?url";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions from "../../services/hooks/useWindowDimensions";
import { getLoginStatus, getModalStatus } from "../../redux/auth/auth-selector";

const Header = ({ menuActive, setMenuActive }) => {
  const { width } = useWindowDimensions();
  const isLogin = useSelector(getLoginStatus);
  const showModal = useSelector(getModalStatus);

  useEffect(() => {
    const body = document.querySelector("#root");
    if (menuActive) {
      disableBodyScroll(body);
    } else {
      enableBodyScroll(body);
    }
  }, [menuActive]);
  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <div className={s.block}>
          <Logo />
          {!(isLogin && width < 1280) && (
            <div className={s.info}>
              <UserNav isLogin={isLogin} />
            </div>
          )}
          {isLogin && width > 767 && <UserInfo />}
          {isLogin && (
            <button
              type="button"
              className={s.burgerBtn}
              onClick={() => setMenuActive(!menuActive)}
            >
              <img
                src={menuActive ? closeIcon : burgerIcon}
                alt="Menu icon"
                className={s.icon}
              />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
