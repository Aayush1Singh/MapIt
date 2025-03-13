/* eslint-disable react/prop-types */
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { PostProvider } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading } = PostProvider();
  console.log(cities, isLoading, "lo");
  if (isLoading) return <Spinner></Spinner>;
  if (cities.length == 0)
    return <Message messgae={"no country found"}></Message>;
  console.log("helo", cities);
  // eslint-disable-next-line no-unused-vars
  const countries = [
    ...new Set(
      cities.map((city) => ({ country: city.country, emoji: city.emoji }))
    ),
  ];
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((city) => (
        <CountryItem country={city} key={city.emoji}></CountryItem>
      ))}
    </ul>
  );
}
export default CountryList;
