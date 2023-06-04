<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <main-header/>
                <header-hero/>
            </el-header>
            <el-main>
              <h1 class="d-f jc-c">Current rover: &nbsp;{{ params.roverName }}</h1>

                <main-rovers @select-rover="selectRover"/>
                <div class="result-modal">
                    <main-date-picker @change-date="selectDate"/>
                    {{ roverImages.length }}
                    <ul
                        v-infinite-scroll="loadMore"
                        class="infinite-list"
                        style="overflow: auto; max-height: 600px"
                        :infinite-scroll-immediate="false"
                    >
                        <li v-for="roverImageData in roverImages" :key="roverImageData.id" class="infinite-list-item">
                           <img :src="roverImageData.img_src" />
                        </li>
                    </ul>
                  <p v-if="isNoImages">Закончився :(</p>
                </div>
            </el-main>
            <el-footer>Made by Vera Vozmisheva</el-footer>
        </el-container>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import MainRovers from '../components/MainRovers.vue'
import MainHeader from '../components/MainHeader.vue'
import MainDatePicker from '../components/MainDatePicker.vue'

import {getRoverPhotos} from "@/api/getNasaApi.api.js"
import HeaderHero from "@/components/HeaderHero.vue"

const roverImages = ref([])

const params = reactive({
    roverName: '',
    page: 1,
    earthDate: ''
})

const isNoImages = ref(false)

const  getRoverPhotoData = async () => {
    const [error, response] = await getRoverPhotos(params.roverName, {
        page: params.page,
        earth_date: params.earthDate
    })

    if (!error && response) {
      roverImages.value = [...roverImages.value, ...response.photos]

      if (!response.photos.length) {
        isNoImages.value = true
      }
    }
}

const loadMore = async () => {
    params.page += 1

    await getRoverPhotoData()
}

const selectRover = (roverTitle) => {
    params.roverName = roverTitle
}

const selectDate = async (selectedDate) => {
    params.earthDate = selectedDate

    await getRoverPhotoData()
}

</script>

<style lang="scss" scoped>

</style>