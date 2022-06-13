<template>
  <div class="home">
    <div class="alert alert-dismissible" :class="{show: showModal, fade: !showModal, 'alert-success': modalSuccess, 'alert-danger': modalError}" role="alert" v-if="showModal">
      {{modalMessage}}
      <button type="button" class="btn" aria-label="Close" @click="showModal=false" >
        <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
      </button>
    </div>
    <div class="search">
        <i class="fa fa-search"></i>
        <input type="text" list="datalistOptions" class="form-control" placeholder="Search city..." v-model="query">
        <datalist id="datalistOptions">
          <option v-for="(item, index) in results" :key="index">{{item.LocalizedName}}</option>
        </datalist>
    </div>
    <div>
      <div class="top" v-if="forecasts[0]">
        <div style="display: flex">
          <img :src="'./assets/images/'+forecasts[0]['Day']['Icon']+'-s.png'" width="150" height="90" alt="">
          <div >
            <h4 v-if="location">{{location.LocalizedName}}</h4>
            <h4>{{forecasts[0]["Temperature"]["Maximum"]["Value"]}} {{forecasts[0]["Temperature"]["Maximum"]["Unit"]}}</h4>
          </div>
        </div>
        <div>
          <button type="button" class="btn" @click="toggleFavourite()"><i class="bi bi-heart-fill" :style="{color: isFavourite()?'red':'grey'}"></i> {{isFavourite() ?  'Remove from Favourites': 'Add to Favourites'}}</button>
        </div>
      </div>
      <div>
        <div style="display: flex; align-items: center; justify-content: center;">
          <h1 v-if="forecasts[0]">{{forecasts[0]['Day']['LongPhrase']}}</h1>
        </div>
      </div>
      <div class="bottom">
        <Forecast v-for="(forecast, index) in forecasts" :location="location" :forecast="forecast" :key="index"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';
import Forecast from '@/components/Forecast.vue';
import accuWeather from '@/services/accuWeather';
import { mapActions, mapGetters } from 'vuex';
let service = new accuWeather()

export default {
  name: 'HomeView',
  components: {
    Search,
    Forecast
  },
  data() {
    return {
      location: {
        "Version": 1,
        "Key": "215854",
        "Type": "City",
        "Rank": 31,
        "LocalizedName": "Tel Aviv",
        "Country": {
          "ID": "IL",
          "LocalizedName": "Israel"
        },
        "AdministrativeArea": {
          "ID": "TA",
          "LocalizedName": "Tel Aviv"
        }
      },
      results: [],
      query: null,
      forecasts:[],
      showModal: false,
      modalSuccess: false,
      modalError: false,
      modalMessage: null
    }
  },
  computed: {
    ...mapGetters({ favourites: "getFavourites", isMetric: "isMetric" }),
  },
  methods:{
    ...mapActions(['removeFavourite', 'addFavourite']),
    isFavourite(){
      let found = this.favourites.find(f=>f.Key === this.location.Key)
      if(found){
        return true;
      }
      return false
    },
    toggleFavourite(){
      if(this.isFavourite()){
        this.removeFavourite(this.location)
        this.modalSuccess = true;
        this.modalMessage = "Successfully removed from favourites"
        this.showModal = true
        setInterval(()=>{this.showModal=false}, 5000)
      }else{
        this.addFavourite(this.location)
        this.modalSuccess = true;
        this.modalMessage = "Successfully added to favourites"
        this.showModal = true
        setInterval(()=>{this.showModal=false}, 2000)
      }
    }
    },
  watch: {
    async query(newQuery, oldQuery){
      let loc = this.results.filter(s => s?.LocalizedName === newQuery)[0];
      if(loc){
        this.location = loc
      }else{
        if(newQuery.length > 2){
          this.results = await service.suggestLocation(newQuery);
        }
      }
    },
    async location(newVal, oldVal){
      console.log("Location changed");
      this.forecasts = await service.getFiveDayForecast(newVal["Key"]);
      this.isFavourite(this.location["Key"]);

    },
    async isMetric(newVal, oldVal) {
      if (newVal === oldVal) return;
      this.forecasts = await service.getFiveDayForecast(this.location["Key"]);
    },
  },
  async mounted(){
    this.forecasts = await service.getFiveDayForecast(this.location["Key"]);
    console.log(this.forecasts);
    this.favourite = this.isFavourite(this.location["Key"]);
  }
}
</script>

<style scoped>
  .home{
    margin: auto;
  }

  .top{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 20px;
  }

  .bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-top: 20px;
  }
</style>
