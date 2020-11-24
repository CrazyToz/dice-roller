<template>
    <input v-model="numberOfDice" type="number" placeholder="How many dice ?"/>
    <button @click="roll" type="button">Roll !</button>
    <Dice v-for="dice in dices" v-bind:value="dice.value" :key="dice"></Dice>
</template>

<script>
    import Dice from "./Dice";

    export default {
        name: "Dashboard",
        components: {
            Dice
        },
        data() {
            return {
                numberOfDice: 0,
                dices: []
            }
        },
        methods: {
            roll() {
                this.dices = [];
                for (let i = 0; i < this.numberOfDice; i++) {
                    this.dices.push({
                        value: Math.floor(Math.random() * 6) + 1
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>