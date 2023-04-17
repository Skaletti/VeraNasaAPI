<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <main-header />
                <header-hero />
            </el-header>
            <el-main>
                <main-rovers @select-rover="selectRover"/>
                <div class="result-modal">
                  <main-date-picker @change-date="selectDate" />
                  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
                  </ul>
                </div>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import MainRovers from '../components/MainRovers.vue'
import MainHeader from '../components/MainHeader.vue'
import MainDatePicker from '../components/MainDatePicker.vue'

import { getRoverPhotos } from "@/api/getNasaApi.api.js"
import HeaderHero from "@/components/HeaderHero.vue"

const roverName = ref('')
const currentDate = ref(new Date())
const roverImages = ref([])

const selectRover = async (roverTitle) => {
    roverName.value = roverTitle
}

async function selectDate(selectedDate) {
    currentDate.value = selectedDate

  const response = await getRoverPhotos({
    rover_name: roverName.value,
    earth_date: currentDate.value
  })

  roverImages.value = response.photos.map(({ img_src }) => img_src)

  console.log(roverImages.value)
}

</script>

<style lang="scss" scoped></style>