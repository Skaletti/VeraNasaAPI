<template>
    <ul>
        <li v-for="roverImageUrl in props.incomingData" :key="roverImageUrl.id">
            <img :src="roverImageUrl">
        </li>
    </ul>
    <el-pagination background layout="prev, pager, next" :total="1000" />
</template>

<script setup>
const props = defineProps(['incomingData'])
</script>

<style lang="scss" scoped>

</style>