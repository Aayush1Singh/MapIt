/* eslint-disable no-unused-vars */
// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import { countryCodeEmoji, emojiCountryCode } from "country-code-emoji";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Message from "./Message";
import { PostProvider } from "../contexts/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [searchParam, useSearchParam] = useSearchParams();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const lat = searchParam.get("lat");
  const lng = searchParam.get("lng");
  const [valid, setValid] = useState(1);
  const [emoji, setEmoji] = useState(null);
  const { setCities } = PostProvider();
  const [isSubmitted, setisSubmitted] = useState(0);
  function addCity(e) {
    e.preventDefault();
    if (!lat || !lng) return;

    const newCity = {
      cityName,
      country,
      date,
      emoji,
      notes,
      position: { lat, lng },
    };

    setCities((old) => [newCity, ...old]);
    createCity(newCity);
    setisSubmitted(1);
    navigate("/app/cities");
  }

  const createCity = async function (newCity) {
    const res = await fetch(`http://localhost:9000/cities`, {
      method: "POST",
      body: JSON.stringify(newCity),
      header: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    // if (!data.countryCode) setValid(0);
    // else {
    //   setValid(1);
    //   setCountry(convertToEmoji(`${data.countryCode}`));
    //   console.log(setEmoji(convertToEmoji(data.countryCode)));

    //   setCityName(data.city);
  };
  useEffect(() => {
    const fetchCity = async function (lat, lng) {
      if (!lat || !lng) return;

      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
      );
      const data = await res.json();
      console.log(data);
      if (!data.countryCode) setValid(0);
      else {
        setValid(1);
        setCountry(convertToEmoji(`${data.countryCode}`));
        console.log(setEmoji(convertToEmoji(data.countryCode)));

        setCityName(data.city);
      }
    };
    fetchCity(lat, lng);
  }, [lat, lng, searchParam]);
  if (!valid) return <Message message={"Choose a valid teritory"}></Message>;
  if (isSubmitted) return <Message message={"City added"}></Message>;
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <button onClick={addCity}>Add</button>
        <button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          &larr; Back
        </button>
      </div>
    </form>
  );
}

export default Form;
