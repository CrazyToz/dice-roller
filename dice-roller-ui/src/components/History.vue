<template>
    <p>History of {{player}}</p>
    <div class="history-container">
        <div v-bind:key="roll" v-for="roll in rolls" class="roll-container">
            <Die v-bind:key="dice" v-for="dice in roll" v-bind:value="dice.value" size="small"></Die>
        </div>
    </div>
</template>

<script>
    import Die from "./Die";

    export default {
        name: "History",
        components: {Die},
        props: {
            player: String,
            rolls: Array
        }
    }
</script>

<style scoped>
    .history-container {
        display: flex;
        flex-direction: column;
    }

    .roll-container {
        display: flex;
    }
</style>