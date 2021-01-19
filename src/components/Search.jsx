import React, { useState } from "react";
import fetchWeather from "../api/fetchWeather";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
  let [displayResults, setDisplayResults] = useState(false);
  let [query, setQuery] = useState("");
  let [mainTemp, setMainTemp] = useState(0);
  let [description, setDescription] = useState("");
  let [iconID, setIconID] = useState("");
  let [windSpeed, setWindSpeed] = useState("");
  let [windGust, setWindGust] = useState("");
  let [windDirection, setWindDirection] = useState("");
  let [name, setName] = useState("");
  let [country, setCountry] = useState("");

  function getWindDirection(deg) {
    if (deg >= 11.25 && windDirection <= 33.75) {
      return "NNE";
    } else if (deg >= 33.76 && windDirection <= 56.25) {
      return "NE";
    } else if (deg >= 56.26 && windDirection <= 78.75) {
      return "ENE";
    } else if (deg >= 78.76 && windDirection <= 101.25) {
      return "E";
    } else if (deg >= 101.26 && windDirection <= 123.75) {
      return "ESE";
    } else if (deg >= 123.76 && windDirection <= 146.25) {
      return "SE";
    } else if (deg >= 146.26 && windDirection <= 168.75) {
      return "SSE";
    } else if (deg >= 168.76 && windDirection <= 191.25) {
      return "S";
    } else if (deg >= 191.26 && windDirection <= 213.75) {
      return "SSW";
    } else if (deg >= 213.76 && windDirection <= 236.25) {
      return "SW";
    } else if (deg >= 236.26 && windDirection <= 258.75) {
      return "WSW";
    } else if (deg >= 258.76 && windDirection <= 281.25) {
      return "W";
    } else if (deg >= 281.26 && windDirection <= 303.75) {
      return "WNW";
    } else if (deg >= 303.76 && windDirection <= 326.25) {
      return "NW";
    } else if (deg >= 326.26 && windDirection <= 348.75) {
      return "NNW";
    } else {
      return "N";
    }
  };

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
        display: 'flex',
        margin: theme.spacing(.2),
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
          width: "260px"
        },
        "&:hover fieldset": {
          borderColor: "#FDB124"
        },
        "&.Mui-focused fieldset": {
          borderColor: "#FDB124"
        },
      },
    },
  }));

  const weatherSearch = async (e) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setDisplayResults(true);
      setMainTemp(data.main.temp);
      setDescription(data.weather[0].description);
      setIconID(data.weather[0].icon);
      setWindSpeed(data.wind.speed);
      setWindGust(data.wind.gust);
      setWindDirection(data.wind.deg);
      setName(data.name);
      setCountry(data.sys.country);
      setWindDirection(getWindDirection(data.wind.deg));
      setQuery("");
    }
  };

  const classes = useStyles();

  return (
    <div>
      <container className="container">
        <div>
      <h1 className="cityChoose">Choose your city:</h1>
      
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" style={{color: "#FDB124"}}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      
      {displayResults ? null : <h4>Example: Chicago, IL, US</h4>}
      </div>
      </container>

      {displayResults ? (
        <>
          <h1 className="currentWeather">The current weather in {name}, {country} is:</h1>

          <div className="descriptionContainer">
            <div className="description_icon">
              <img src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"} alt="Icon of Current Weather" />
            </div>
            <div className="description_label">
              {description}
            </div>
          </div>

          <container className="weatherData">
            <div className="temperatureContainer">

            <div className="temperature_Fa">
              {(mainTemp * 1.8 + 32).toFixed(1)} &deg;F
            </div>
            
            <div className="temperature_Ce">
              {mainTemp.toFixed(1)}{" "}&deg;C
            </div>
            </div>
          </container>

          <container className="windData">
            <div className="windDirection">
              Wind Direction:
              <hr />
              {windDirection}
            </div>

            <div className="windSpeed">
              Wind Speed:
              <hr />
              {windSpeed} MPH
            </div>

            <div className="windGusts">
              Wind Gusts:
              <hr />
              {windGust} MPH
            </div>
          </container>
        </>
      ) : null}
    </div>
  );
};

export default Search;
