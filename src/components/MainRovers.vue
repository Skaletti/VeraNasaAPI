<template>
    <div class="main-rovers">
        <ul v-for="rover in roversList" :key="rover.title" class="rovers-list">
            <div class="image-parallax rovers-list__item" > <!--ontouchstart="this.classList.toggle('hover');" -->
                <div class="image-container">
                    <div class="front-side main-list__item rover-curiosity">
                        <div class="inner">
                            <img :src="rover.url" class="rovers-list__image">
                        </div>
                    </div>
                    <div class="back-side" @click="handleRoverSelect(rover.title)">
                        <div class="inner main-list__item rover-curiosity" data-name="curiosity">
                            <p>{{ rover.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </ul>
    </div>
</template>

<script setup>
const emits = defineEmits(['select-rover'])

const roversList = [
    {
        title: 'Spirit',
        url: '/src/assets/images/spirit-rover.jpg',
        description: "Spirit"
    },
    {
        title: 'Opportunity',
        url: '/src/assets/images/opportunity-rover.jpg',
        description: "Opportunity"
    },
    {
        title: 'Curiosity',
        url: '/src/assets/images/curiosity-rover.jpg',
        description: "Curiosity"
    }
]

function handleRoverSelect(roverTitle) {
    emits('select-rover', roverTitle)
}
</script>

<style lang="scss" scoped>
.main-rovers {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    max-height: 450px;
}

.rovers-list {
    &__item {
        width: 450px;
        margin-right: 35px;
    }

    &__image {
        position: relative;
        width: 330px;
        height: 300px;
    }
}

.el-row {
    margin-bottom: 20px;
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
}
</style>