import styles from "./Sidebar.module.css";
import Logo from "./Logo";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo></Logo>
      <AppNav></AppNav>
      <p>List of Cities</p>
      <Outlet />
      <footer className={styles.footer}>&copy; CopyRight {Date()}</footer>
    </div>
  );
}

export default Sidebar;
