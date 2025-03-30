import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";
export default function LinkWithIcon({ title, link, emoji, sidebar = false }) {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title} <img src={emoji} alt="" className="link_emoji" />
    </NavLink>
  );
}
