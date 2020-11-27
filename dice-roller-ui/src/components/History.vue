<template>
    <p>History of {{player}}</p>
    <div class="history-container">
        <div v-bind:key="roll" v-for="roll in rolls" class="roll-container">
            <Dice v-bind:key="dice" v-for="dice in roll" v-bind:value="dice.value" size="small"></Dice>
        </div>
    </div>
</template>

<script>
    import Dice from "./Dice";

    export default {
        name: "History",
        components: {Dice},
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