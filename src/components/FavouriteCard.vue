<template>
    <div class="card" style="width: 200px; margin: 5px;">
    <div class="card-header">
      {{getDay()}}
      <button type="button" class="btn" @click="toggleFavourite()"><i class="bi bi-heart-fill" :style="{color: 'red'}"></i></button>
    </div>
        <div class="card-body" v-if="data">
            <h5 class="card-title">{{location.LocalizedName}}</h5>
            <p class="card-text">{{data.Temperature.Maximum.Value}} {{data.Temperature.Maximum.Unit}}</p>
        </div>
        <img v-if="data" :src="'./assets/images/'+data['Day']['Icon']+'-s.png'" width="150" height="90" style="margin:auto" alt="...">
        <div v-if="data" class="card-body">
            <h5 class="card-title">{{location.LocalizedName}}</h5>
            <p class="card-text">{{data.Day.LongPhrase}}</p>
        </div>
    </div>
</template>

<script>
import accuWeather from '@/services/accuWeather';
import { mapActions, mapGetters } from 'vuex';

let service = new accuWeather()

export default {
  name: 'Favourite',
  props: ['location', 'toggleFavourite'],
  data(){
    return {
      data: null,
    }
  },
  methods: {
    ...mapActions(['removeFavourite', 'addFavourite']),
    toggleFavourite(){
      this.$emit('removedFavourite');
    },
    getDay(){
      if(this.data){
        const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = (new Date(this.data.Date)).getDay();
        return weekdays[day];
      }
      
    }
  },
  watch: {
    async location(newVal, oldVal){
      // if(newVal){
      //   this.data = await service.getFavouriteData(this.location['Key'])
      //   console.log(this.data);
      // }
    }
  },
  async created(){
    const weatherData = await service.getFavouriteData(this.location['Key']);
    this.data = weatherData[0];
    console.log(weatherData[0]);
  }
}
</script>