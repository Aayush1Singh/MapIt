import { Link } from "react-router-dom";
import styles from "./PageNav.module.css";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav}>
        {/* <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/homepage">Homepage</Link>
        </li> */}
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>

        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/login" className={styles.catLink}>
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
