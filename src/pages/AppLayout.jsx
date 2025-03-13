// npm run de
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../components/map";
function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar></Sidebar>
      <Map></Map>
      {/* <p>App</p> */}
    </div>
  );
}

export default AppLayout;
