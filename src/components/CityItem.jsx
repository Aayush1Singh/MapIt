/* eslint-disable react/prop-types */
import { PostProvider } from "../contexts/CitiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
function formatDate(date) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
// eslint-disable-next-line no-unused-vars
function CityItem({ city, key }) {
  const { currentCity } = PostProvider();

  const { cityName, emoji, date, id, position } = city;

  const { setCities } = PostProvider();
  async function DeleteFromData() {
    // e.preventDefualt();
    const res = await fetch(`http://localhost:9000/cities/${city.id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);
  }
  function deleteItem(e) {
    e.preventDefault();
    console.log("deleteing item");
    setCities((cities) => {
      return cities.filter((cityo) => {
        if (cityo.id === city.id) return false;
        return true;
      });
    });
    DeleteFromData();
  }
  return (
    <li
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : ""
      }`}
    >
      <Link
        to={`${id}?lat=${position.lat}&long=${position.lng}`}
        className={styles.cityItem}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={deleteItem}>
          &times;
        </button>
      </Link>
    </li>
  );
}
export default CityItem;
