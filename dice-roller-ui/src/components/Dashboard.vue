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
                dices: this.$store.state.myRolls
            }
        },
        methods: {
            roll() {
                let rolls = [];
                for (let i = 0; i < this.numberOfDice; i++) {
                    rolls.push(6);
                }
                this.$store.commit('newRoll', rolls);
            }
        }
    }
</script>

<style scoped>

</style>