<template>
    <div class="face" v-bind:class="[classValue, size]">
        <div v-for="n in valueAsNumber" :key="n" class="point"></div>
    </div>
</template>

<script>
    export default {
        name: "Dice",
        props: {
            value: {
                validator: function (value) {
                    const valueAsInteger = parseInt(value);
                    return valueAsInteger >=1 && valueAsInteger <=6;
                }
            },
            size: {
                validator: function (value) {
                    return value === 'small' || value === 'large'
                }
            }
        },
        computed: {
            valueAsNumber: function() {
                return parseInt(this.value);
            },
            classValue: function () {
                return {
                    one: this.valueAsNumber === 1,
                    two: this.valueAsNumber === 2,
                    three: this.valueAsNumber === 3,
                    four: this.valueAsNumber === 4,
                    five: this.valueAsNumber === 5,
                    six: this.valueAsNumber === 6
                }
            }
        }
    }
</script>

<style scoped>
    .face {
        position: relative;
        background-color: beige;
        border-radius: 25px;
    }

    .small {
        width: 25px;
        height: 25px;
    }

    .large {
        width: 150px;
        height: 150px;
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