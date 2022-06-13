<template>
    <div class="alert alert-dismissible" :class="{show: showModal, fade: !showModal, 'alert-success': modalSuccess}" role="alert" v-if="showModal">
      {{modalMessage}}
      <button type="button" class="btn" aria-label="Close" @click="showModal=false" >
        <span aria-hidden="true"><i class="bi bi-x-lg"></i></span>
      </button>
    </div>
  <div class="favourites">
    <FavouriteCard v-for="favourite in favourites" :location="favourite" @removedFavourite="toggleFavourite(favourite)" :key="favourite"/>
  </div>
</template>


<script>
// @ is an alias to /src
import FavouriteCard from '@/components/FavouriteCard.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'FavouriteView',
  components: {
    FavouriteCard
  },
  computed: {...mapGetters({favourites: 'getFavourites'})},
  data() {
    return {
      showModal: false,
      modalSuccess: false,
      modalError: false,
      modalMessage: null
    }
  },
  methods: {
    ...mapActions(['removeFavourite']),
    toggleFavourite(location){
        this.removeFavourite(location)
        this.modalSuccess = true;
        this.modalMessage = "Successfully removed from favourites"
        this.showModal = true
        setInterval(()=>{this.showModal=false}, 5000)
    }
  },
}
</script>

<style scoped>
  .favourites{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 80%;
    margin: auto;
    padding: 15px;
  }
</style>

