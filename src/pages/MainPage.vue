<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <main-header/>
                <header-hero/>
            </el-header>
            <el-main>
                <main-rovers @select-rover="selectRover"/>
                <div class="result-modal">
                    <main-date-picker @change-date="selectDate"/>
                    <ul v-infinite-scroll="loadMore" class="infinite-list" style="overflow: auto">
                        <li v-for="roverImage in roverImages" :key="roverImage" class="infinite-list-item">
                           <img :src="roverImage" alt="">
                        </li>
                    </ul>
                </div>
            </el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </div>
</template>

<script setup>
import {reactive, ref} from 'vue'
import MainRovers from '../components/MainRovers.vue'
import MainHeader from '../components/MainHeader.vue'
import MainDatePicker from '../components/MainDatePicker.vue'

import {getRoverPhotos} from "@/api/getNasaApi.api.js"
import HeaderHero from "@/components/HeaderHero.vue"

const roverName = ref('')
const currentDate = ref(new Date())
const roverImages = ref([])

const params = reactive({
    roverName: roverName.value,
    page: 1,
    earthDate: currentDate.value
})

async function getRoverPhotoData() {
    if (params.page < 10) {
        const response = await getRoverPhotos({
            rover_name: params.roverName,
            page: params.page,
            earth_date: params.earthDate
        })
        // roverImages.value = roverImages.value.concat(response.photos.map(({img_src}) => img_src))

        roverImages.value = [...roverImages.value, ...response.photos]
        console.log(roverImages.value)
    }

}

const loadMore = async () => {
    params.page += 1

    await getRoverPhotoData()
}

const selectRover = (roverTitle) => {
    params.roverName = roverTitle
}

async function selectDate(selectedDate) {
    params.earthDate = selectedDate

    await getRoverPhotoData()
}

</script>

<style lang="scss" scoped>

</style>