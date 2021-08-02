import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import Select from "react-select";
import { allCities } from "./Cities";

const MainComponent = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleChange = (city) => {
    setSelectedCity(city);
  };

  function Test() {
    const map = useMap();
    if (selectedCity?.position) map.flyTo(selectedCity.position, 13);

    return selectedCity?.position ? (
      <Marker draggable position={selectedCity.position}>
        <Popup>Welcome To {selectedCity.label}</Popup>
      </Marker>
    ) : null;
  }

  return (
    <div className="container fluid">
      <div className="row">
        <h4 className="text-center mt-2 mb-sm-5 headerContainer">
          {" "}
          Internship Task unMazer.io
        </h4>
      </div>
      <div className="row mt-3">
        <div className="col-md-4 me-5">
          <div className="row m-4 m-sm-0 ">
            <Select
              className="reactSelectContainer"
              cacheOptions
              classNamePrefix="react-select"
              options={allCities}
              onChange={(city) => handleChange(city)}
            />
          </div>
          <div className="row mt-5 mb-4">
            {selectedCity ? (
              <div className="populationContainer">
                {" "}
                Population: {selectedCity?.population} <br /> ({" "}
                {selectedCity.popInString} ){" "}
              </div>
            ) : (
              <div className="populationContainer">
                Please select a city to view population
              </div>
            )}
          </div>
        </div>
        <div className="col p-0 mapContainer m-4 m-sm-0">
          <MapContainer
            center={
              selectedCity ? selectedCity.position : { lat: 28.6, lng: 77.2 }
            }
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Test />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
