import React, { useEffect, useState } from 'react';

import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData, getWeatherData } from './API';
import Header from './components/Header/Header';
import List from './components/List/List';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import Map from './components/Map/Map';
export const App = () => {
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [childClicked, setChildClicked] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds && bounds.sw && bounds.ne) {
      setLoading(true);
      getWeatherData(coords.lat, coords.lng).then((data) => {
        setWeatherData(data);
        console.log(data);
      });
      getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
        setPlaces(data?.filter((item) => item.name && item.num_reviews > 0));
        setFilteredPlaces([]);
        setLoading(false);
        console.log(places);
      });
    }
    // getPlacesData(bounds.sw, bounds.ne).then((data) => {
    //   console.log(data);
    //   setPlaces(data);
    // });
  }, [bounds, type]);

  useEffect(() => {
    const filterPlaces = places?.filter((place) => place.rating > rating);
    setFilteredPlaces(filterPlaces);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header setCoords={setCoords} />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};
