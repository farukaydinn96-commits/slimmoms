import s from "./UserNav.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

import { links } from "./links";

// combină clasele .link și .activeLink în funcție de activare
const getLinkClassName = ({ isActive }) =>
  clsx(s.link, isActive && s.activeLink);

function UserNav({ isLogin }) {
  const selectLinks = isLogin
    ? links.filter((item) => item.private)
    : links.filter((item) => !item.private);

  return (
    <ul className={s.nav}>
      {selectLinks.map(({ id, to, text }) => (
        <li className={s.item} key={id}>
          <NavLink className={getLinkClassName} to={to}>
            {text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default UserNav;
