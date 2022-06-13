<template>
    <div class="card" style="width: 200px; margin: 5px;">
        <div class="card-header">
          {{getDay()}}
        </div>
        <div class="card-body">
            <h5 class="card-title">{{location.LocalizedName}}</h5>
            <p class="card-text">{{forecast['Temperature']['Maximum']['Value']}} {{forecast['Temperature']['Maximum']['Unit']}}</p>
        </div>
        <img :src="'./assets/images/'+forecast['Day']['Icon']+'-s.png'" width="150" height="90" style="margin:auto" alt="...">
        <div class="card-body">
            <h5 class="card-text">{{forecast['Day']['ShortPhrase']}}</h5>
            <!-- <p class="card-text">{{data.Headline.Text}}</p> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'Forecast',
  props: ['forecast', 'location'],
  data(){
    return {
    }
  },
  methods: {
    getDay(){
      const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let day = (new Date(this.forecast.Date)).getDay();
      return weekdays[day];
    }
  },
}
</script>