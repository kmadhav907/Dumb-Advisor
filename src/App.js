import React, { useEffect, useState } from 'react';

import { CssBaseline, Grid } from '@material-ui/core';
import { getPlacesData } from './API';
import Header from './components/Header/Header';
import List from './components/List/List';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import Map from './components/Map/Map';
export const App = () => {
  const [places, setPlaces] = useState([]);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds !== null) {
      getPlacesData(bounds.sw, bounds.ne).then((data) => {
        setPlaces(data);
        console.log(places);
      });
    }
    // getPlacesData(bounds.sw, bounds.ne).then((data) => {
    //   console.log(data);
    //   setPlaces(data);
    // });
  }, [coords, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setBounds={setBounds}
            setCoords={setCoords}
            coords={coords}
            places={places}
          />
        </Grid>
      </Grid>
    </>
  );
};
