import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Rating } from '@material-ui/lab';
import useStyles from './styles';
import { mapStyles } from './mapStyles';

export default function Map({
  coords,
  setCoords,
  setBounds,
  places,
  setChildClicked,
  weatherData
}) {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width: 600px)');

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles
        }}
        onChange={(e) => {
          setCoords({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places &&
          places.map((place, index) => (
            <div
              className={classes.markerContainer}
              lat={Number(place.latitude)}
              lng={Number(place.longitude)}
              key={index}
            >
              {!isMobile ? (
                <LocationOnOutlinedIcon color='primary' fontSize='large' />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant='subtitle2'
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
                    }
                    alt={place.name}
                    className={classes.pointer}
                  />
                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))}
        {weatherData?.list?.map((data, index) => {
          return (
            <div key={index} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt={'weather'}
                height={100}
              />
            </div>
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
