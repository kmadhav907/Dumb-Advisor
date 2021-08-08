import React from 'react';
import {
  Box,
  Typography,
  CardMedia,
  Card,
  CardContent
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Rating } from '@material-ui/lab';
import useStyles from './styles';
export default function PlaceDetails({ place, selected, refProp }) {
  const classes = useStyles();
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'
        }
        title={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>
          {place.name || 'Not Updated'}
        </Typography>

        <Rating size='small' value={Number(place.rating) || 0} readOnly />

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Reviews&nbsp;</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.num_reviews || 'Not Updated'}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.price || 'Not Updated'}
          </Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking&nbsp;</Typography>
          <Typography gutterBottom variant='subtitle1'>
            {place.ranking || 'Not Updated'}
          </Typography>
        </Box>
        {place &&
          place.awards &&
          place.awards.map((award, index) => (
            <Box
              my={1}
              display='flex'
              justifyContent='space-between'
              key={index}
            >
              <img src={award.images.small} alt={award.display_name} />
              <Typography variant='subtitle2' color='textSecondary'>
                {award.display_name}
              </Typography>
            </Box>
          ))}

        <Typography
          variant='subtitle2'
          color='textSecondary'
          className={classes.subtitle}
        >
          <LocationOnIcon />
          {place.location_string || 'Not Updated'}
        </Typography>
        <Typography
          variant='subtitle2'
          color='textSecondary'
          className={classes.subtitle}
        ></Typography>
      </CardContent>
    </Card>
  );
}
