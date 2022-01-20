<template>
  <div class="houses row">
    <div class="col-12 d-flex justify content-between p-5">
      <h1>Houses</h1>
      <button 
      class="btn btn-outline-dark"
      data-bs-toggle= "modal"
      data-bs-target= "#create-car"
      v-if="account-id"
      >
      <i class="mdi mdi-plus"></i>
      </button>
    </div>
    <div v-if="loading" class="col-12">
      <i class="mdi mdi-spinner mdi-spin"></i>
    </div>
    <div v-else class="col-12">
      <div class="row">
        <div class="col-md-4 m-3" v-for="hData in houses" :key="hData.id">
          <House :house="hData">
        </div>
      </div>
    </div>
  </div>
  <Modal id="create-house">
    <template #modal-title> Create Car </template>
    <template #modal-body>
      <HouseForm />
    </template>
  </Modal>
</template>


<script>
import { computed, onMounted, ref } from "@vue/runtime-core"
import Pop from "../utils/Pop"
import {housesService} from '../services/HousesServices'
import { AppState } from "../AppState"
import { logger } from "../utils/Logger"

export default {
  setup(){
    const loading = ref(true)
    onMounted(async () => {
      try {
        await housesService.getAllHouses()
      } catch (error) {
        logger.error(error)
        Pop.toast('Unable to get Houses bruh')
      }
    }) 
    return {
      loading,
      houses: computed(() => AppState.houses),
      account: computed(() => AppState.account)
    }
  }
}
</script>


<style lang="scss" scoped>

</style>