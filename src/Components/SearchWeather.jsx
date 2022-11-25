import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const SearchWeather = () => {
  const [search, setSearch] = useState("london");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const fetchWeather = async () => {
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=74d22760538b77b4a9e594229dcd31c5`
      );
      if (componentMounted) {
        setData(await resp.json());
        console.log(data);
      }
      return () => {
        componentMounted = false;
      };
    };
    fetchWeather();
  }, []);
  let emoji = null;
  if (typeof data.main !== "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
      emoji = "fa-snow-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }
  let temp = (data.main.temp - 273.15).toFixed(2);
  let temp_min = (data.main.temp_min - 273.15).toFixed(2);
  let temp_max = (data.main.temp_max - 273.15).toFixed(2);
  //Date
  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });
  //Time

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card text-white text-center border-0">
              <img
                className="card-img"
                src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
                alt="..."
              />
              <div className="card-img-overlay">
                <form>
                  <div className="input-group mb-4 mx-auto">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search city"
                      aria-label="Search city"
                      aria-describedby="basic-addon2"
                    />

                    <button
                      type="submit"
                      className="input-group-text"
                      id="basic-addon2"
                    >
                      <i className="fas fa-search"></i>
                    </button>
                  </div>
                </form>
                <div className="bg-dark bg-opacity-50 py-2">
                  <h2 className="card-title">{data.name}</h2>
                  <p className="card-text lead">Thursday, October 14, 2021</p>
                  <hr />
                  <i className={`fas ${emoji} fa-4x`}></i>
                  <h1 className="fw-bolder mb-5">{temp}&deg;C</h1>
                  <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                  <p className="lead">
                    {temp_min}&deg;C | {temp_max}&deg;C
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
