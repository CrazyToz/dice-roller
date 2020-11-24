<template>
    <div class="face" v-bind:class="classValue">
        <div v-for="n in value" :key="n" class="point"></div>
    </div>
</template>

<script>
    export default {
        name: "Dice",
        props: {
            value: {
                validator: function (value) {
                    return value >=1 && value <=6;
                }
            }
        },
        computed: {
            classValue: function () {
                return {
                    one: this.value === 1,
                    two: this.value === 2,
                    three: this.value === 3,
                    four: this.value === 4,
                    five: this.value === 5,
                    six: this.value === 6
                }
            }
        }
    }
</script>

<style scoped>
    .face {
        position: relative;
        width: 150px;
        height: 150px;
        background-color: beige;
        border-radius: 25px;
    }

    .point {
        position: absolute;
        width: 20%;
        height: 20%;
        background-color: black;
        border-radius: 25px;
    }

    .one .point:first-child, .three .point:nth-child(2), .five .point:last-child {
        top: 40%;
        left: 40%;
    }

    .two .point:first-child, .three .point:first-child, .four .point:last-child, .five .point:nth-child(4), .six .point:nth-child(5) {
        bottom: 10%;
        left: 10%;
    }

    .two .point:last-child, .three .point:last-child, .four .point:nth-child(2), .five .point:nth-child(2), .six .point:nth-child(2) {
        top: 10%;
        right: 10%;
    }

    .four .point:first-child, .five .point:first-child, .six .point:first-child {
        top: 10%;
        left: 10%;
    }

    .four .point:nth-child(3), .five .point:nth-child(3), .six .point:nth-child(4) {
        bottom: 10%;
        right: 10%;
    }

    .six .point:nth-child(3) {
        top: 40%;
        right: 10%;
    }

    .six .point:last-child {
        top: 40%;
        left: 10%;
    }

</style>