/* eslint-disable react/prop-types */
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import { PostProvider } from "../contexts/CitiesContext";
function CityList() {
  const { cities, isLoading } = PostProvider();
  console.log(cities, isLoading, "lo");
  if (isLoading) return <Spinner></Spinner>;
  if (cities.length == 0)
    return <Message messgae={"no cities found"}></Message>;
  console.log("helo", cities);
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id}></CityItem>
      ))}
    </ul>
  );
}
export default CityList;
