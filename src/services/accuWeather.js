import axios from 'axios';
import store from '../store'


export default class accuWeather {

    async suggestLocation(query){
        let url = "https://dataservice.accuweather.com/locations/v1/cities/autocomplete"
        let results = await axios.get(url, {
            params: {
              apikey: 'qi6PRflc0jKo0pnMAT5asQDX0ULRIEBh',
              q:query
            }
        })
        return results.data
    }

    async getFiveDayForecast(locationKey){
        let url =`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`
        let results = await axios.get(url, {
            params: {
              apikey: 'qi6PRflc0jKo0pnMAT5asQDX0ULRIEBh',
              details: true,
              metric: store.state.isMetric

            }
        })
        return results.data['DailyForecasts']
    }

    async getFavouriteData(locationKey){
        let url =`https://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}`
        let results = await axios.get(url, {
            params: {
              apikey: 'qi6PRflc0jKo0pnMAT5asQDX0ULRIEBh',
              details: true,
              metric: store.state.isMetric

            }
        })
        return results.data['DailyForecasts']
    }
  
}