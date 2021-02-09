<template>
    <input v-model="numberOfDice" type="number" placeholder="How many dice ?"/>
    <button @click="roll" type="button">Roll !</button>
    <div class="last-roll-container">
        <Die v-for="dice in lastRoll" v-bind:value="dice.value" size="large" :key="dice"></Die>
    </div>
    <!--
    <div class="histories-container">
        <History player="me" v-bind:rolls="myRolls"></History>
        <History :player="otherPlayer.username" :rolls="otherPlayer.rolls" v-bind:key="otherPlayer" v-for="otherPlayer in otherPlayersRolls"></History>
    </div>
    -->
</template>

<script>
    import Die from "./Die";

    export default {
        name: "Dashboard",
        components: {
            Die
        },
        data() {
            return {
                numberOfDice: 0
            }
        },
        computed: {
            lastRoll() {
                return this.$store.state.lastRoll
            },
            myRolls() {
                return this.$store.state.myRolls
            },
            otherPlayersRolls() {
                return this.$store.state.otherPlayersRolls
            }
        },
        methods: {
            roll() {
                let dices = [];
                for (let i = 0; i < this.numberOfDice; i++) {
                    dices.push(6);
                }
                this.$store.commit('newRoll', dices);
            }
        }
    }
</script>

<style scoped>
    .last-roll-container {
        display: flex;
    }

    .last-roll-container div {
        margin: 10px;
    }

    .histories-container {
        display: flex;
    }
</style>