/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";
const URI = "http://localhost:9000/cities";
const CitiesContext = createContext();
function CitiesProvider({ children }) {
  const [currentCity, setCurrentCity] = useState({});
  // const currCity = useParams().id;
  // setCurrentCity(currCity);
  const [cities, setCities] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    async function a() {
      try {
        setLoading(true);

        console.log(`${URI}`);
        const res = await fetch(URI);
        // console.log(data);
        const data = await res.json();
        setCities(data);
        console.log(cities);
      } catch {
        alert("There was an erro");
      } finally {
        setLoading(false);
      }
    }
    a();
  }, []);
  async function getCity(id) {
    try {
      setLoading(true);
      console.log(`${URI}/${id}`);

      const res = await fetch(`${URI}/${id}`);
      // console.log(data);
      const data = await res.json();
      // setCities(data);
      setCurrentCity(data);

      console.log(data, "llllllllllllllll");
    } catch {
      alert("There was an error");
    } finally {
      setLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        setCurrentCity,
        getCity,
        setCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
function PostProvider() {
  const x = useContext(CitiesContext);
  console.log(x, "helllllllllo");
  // if (!x) throw Error("laude context ke bahar access kr rha hai sudhar ja");
  return x;
}
export { CitiesProvider, PostProvider };
