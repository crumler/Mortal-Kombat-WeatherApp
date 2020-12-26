import React, { useState } from "react";
import fetchWeather from "../api/fetchWeather";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const Search = () => {
  let [displayResults, setDisplayResults] = useState(false);
  let [query, setQuery] = useState("");
  let [feelsLike, setFeelsLike] = useState(0);
  let [mainTemp, setMainTemp] = useState(0);
  let [description, setDescription] = useState("");
  let [main, setMain] = useState("");
  let [iconID, setIconID] = useState("");
  let [windSpeed, setWindSpeed] = useState("");
  let [windGust, setWindGust] = useState("");
  let [windDirection, setWindDirection] = useState("");
  let [name, setName] = useState("");

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: "#FDB124",
      color: "black",
      fontFamily: "Mortal Kombat",
      "&:hover": {
        background: "#B57602",
      },
    },
    root: {
      "& > *": {
        margin: theme.spacing(1),
        // width: "25ch",
      },
      input: {
        color: "white",
      },
      primary: {
        backgroundColor: "#FDB124",
      },
      "& label.Mui-focused": {
        color: "#FDB124",
      },
      "& label": {
        color: "#FDB124",
        fontFamily: "Mortal Kombat",
      },
      "& input": {
        color: "#FDB124",
        fontFamily: "Mortal Kombat",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#FDB124",
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#FDB124",
        },
        "&:hover fieldset": {
          borderColor: "#FDB124",
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FDB124",
        },
      },
    },
  }));

  const weatherSearch = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setDisplayResults(true);
      setFeelsLike(data.main.feels_like);
      setMainTemp(data.main.temp);
      setDescription(data.weather[0].description);
      setMain(data.weather[0].main);
      setIconID(data.weather[0].icon);
      setWindSpeed(data.wind.speed);
      setWindGust(data.wind.gust);
      setWindDirection(data.wind.deg);
      setName(data.name);
      setQuery("");
    }
  };

  const classes = useStyles();

  return (
    <div>
      <h1 className="cityChoose">CHOOSE YOUR CITY:</h1>
      {/* <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={weatherSearch}
      /> */}
      {/* <form className={classes.root} noValidate autoComplete="off"> */}
      <TextField
        id="outlined-basic"
        label="Enter City"
        variant="outlined"
        color="secondary"
        size="small"
        spellCheck="false"
        className={classes.root}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={weatherSearch}
      />
      {displayResults ? null : <h4>Example: Chicago, IL, US</h4>}
      {/* <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={weatherSearch}
        >
          Search
        </Button> */}
      {/* </form> */}
      {displayResults ? (
        <>
          <h1>The current weather in {name} is:</h1>

          <span>
            <div>
              <img
                src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"}
              />
            </div>
            <h2>Temperature:</h2>
            <br />
            <div>
              {(mainTemp * 1.8 + 32).toFixed(1)} &deg;F / {mainTemp.toFixed(1)}{" "}
              &deg;C
            </div>
            <br />
            <br />
            <h2>Winds:</h2>
            <div>Wind Direction: {windDirection}</div>
            <div>Wind Speed: {windSpeed} MPH</div>
            <div>Wind Gusts: {windGust} MPH</div>
          </span>
        </>
      ) : null}
    </div>
  );
};

export default Search;
