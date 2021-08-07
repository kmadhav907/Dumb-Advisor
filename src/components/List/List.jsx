import React, { useState } from 'react';
import {
  CircularProgress,
  Grid,
  Typography,
  MenuItem,
  FormControl,
  Select,
  InputLabel
} from '@material-ui/core';
import PlaceDetails from '../PlaceDetails/PlaceDetails';
import useStyles from './styles';

export default function List({ places }) {
  const classes = useStyles();
  const [type, setType] = useState('restruants');
  const [rating, setRating] = useState('');

  return (
    <div className={classes.container}>
      <Typography variant='h4'>
        Restruants, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type:</InputLabel>
        <Select value={type} onChange={(event) => setType(event.target.value)}>
          <MenuItem value='restruants'>Restruants</MenuItem>
          <MenuItem value='hotels'>Hotels</MenuItem>
          <MenuItem value='attractions'>Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating:</InputLabel>
        <Select
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places &&
          places.map((place, index) => {
            return (
              <Grid item key={index} xs={12}>
                <PlaceDetails place={place} />
              </Grid>
            );
          })}
      </Grid>
    </div>
  );
}
