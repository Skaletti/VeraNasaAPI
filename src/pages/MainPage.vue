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
                    <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
                        <li v-for="roverImage in roverImages" :key="roverImage.id" class="list-item">
                            <img class="list-item__image" :src="roverImage" alt="">
                        </li>
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

import {getRoverPhotos} from "@/api/getNasaApi.api.js"
import HeaderHero from "@/components/HeaderHero.vue"

const page = ref(1)
const loading = ref(false)
const load = () => {
    loading.value = true
    setTimeout(() => {
        page.value += 1
        loading.value = false
    }, 2000)
}

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
        page: page,
        earth_date: currentDate.value
    })

    roverImages.value = response.photos.map(({img_src}) => img_src)

    console.log(roverImages.value)
}

</script>

<style lang="scss" scoped>
.infinite-list-wrapper {
    min-height: 100px;
    text-align: center;
}

.infinite-list {
    min-height: 100px;
    padding: 5px;
    margin: 0;
    list-style: none;
}

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item + .list-item {
    margin-top: 10px;
}
</style>