import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary';

const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary',
  params: {
    bl_latitude: '11.847676',
    bl_longitude: '108.473209',
    tr_longitude: '109.149359',
    tr_latitude: '12.838442'
  },
  headers: {
    'x-rapidapi-key': '7e3b564a74mshed197de89daa13ep1c830cjsnab56abb7d930',
    'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
  }
};
export const getPlacesData = async (sw, ne) => {
  try {
    const {
      data: { data }
    } = await axios.get(URL, {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
        limit: '10'
      },
      headers: {
        'x-rapidapi-key': '7e3b564a74mshed197de89daa13ep1c830cjsnab56abb7d930',
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
      }
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
