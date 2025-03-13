/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { PostProvider } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // TEMP DATA
  const x = useParams();
  console.log(x);
  const { getCity, currentCity, isLoading } = PostProvider();
  useEffect(
    function () {
      getCity(x.id);
    },
    [x]
  );
  console.log(currentCity, "kkkkkkkkkkkkk");
  // return <h1>hello</h1>;
  // if (!currentCity) return;
  if (isLoading) return <Spinner></Spinner>;

  // eslint-disable-next-line no-unused-vars
  const { cityName, emoji, date, notes } = currentCity;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>{/* <ButtonBack /> */}</div>
    </div>
  );
}

export default City;
