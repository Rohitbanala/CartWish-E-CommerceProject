import "./LinkWithIcon.css";
export default function ({ title, link, emoji, sidebar = false }) {
  return (
    <a
      href={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title} <img src={emoji} alt="" className="link_emoji" />
    </a>
  );
}
