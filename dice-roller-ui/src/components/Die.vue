<template>
    <!--    <div class="face" v-bind:class="[classValue, size]">-->
    <!--        <div v-for="n in valueAsNumber" :key="n" class="point"></div>-->
    <!--    </div>-->
    <div class="stage">
        <div class="cube">
            <div class="face-3d front">{{ value }}</div>
            <div class="face-3d back">{{ backValue }}</div>
            <div class="face-3d bottom">{{ bottomValue }}</div>
            <div class="face-3d top">{{ topValue }}</div>
            <div class="face-3d right">{{ rightValue }}</div>
            <div class="face-3d left">{{ leftValue }}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Die",
        data() {
            return {}
        },
        props: {
            value: {
                type: Number,
                validator: function (value) {
                    return value >= 1 && value <= 6;
                }
            },
            size: {
                validator: function (value) {
                    return value === 'small' || value === 'large'
                }
            }
        },
        methods: {
            getOpposite(value) {
                return 7 - value;
            },
            getFirstValueAvailable(predicate) {
                return [1, 2, 3, 4, 5, 6].find(predicate);
            }
        },
        computed: {
            backValue() {
                return this.getOpposite(this.value);
            },
            bottomValue() {
                return this.getFirstValueAvailable(value => ![this.value, this.backValue].includes(value));
            },
            topValue() {
                return this.getOpposite(this.bottomValue);
            },
            rightValue() {
                return this.getFirstValueAvailable(value => ![this.value, this.backValue, this.bottomValue, this.topValue].includes(value));
            },
            leftValue() {
                return this.getOpposite(this.rightValue);
            },
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
    @keyframes roll {
        0% {
            transform: rotateY(0);
        }
        10% {
        }
        20% {
        }
        30% {
        }
        40% {
        }
        50% {
        }
        60% {

        }
        70% {
        }
        80% {
        }
        90% {
        }
        100% {
            transform: rotateY(360deg) rotateX(180deg);
        }
    }

    .stage {
        width: 150px;
        height: 150px;
        perspective: 800px;
        perspective-origin: -25% -95%;
    }

    .cube {
        transform-style: preserve-3d;
        animation: roll 1s infinite linear;
    }

    .face-3d:before, .face-3d:after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }

    .face-3d:before {
        background: radial-gradient(ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%);
    }

    .face-3d:after {
        background: radial-gradient(ellipse farthest-corner at 45px 45px, #00FFFF 0%, rgba(0, 0, 255, 0) 50%, #0000FF 95%);
    }

    .face-3d {
        background-color: beige;
        position: absolute;
        width: 150px;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .front {
        transform: translateZ(75px);
    }

    @keyframes frontShading1 {
        2% {
            opacity: 0;
        }
        25% {
            opacity: 0.8;
        }
        35% {
            opacity: 0.8;
        }
        50% {
            opacity: 0;
        }
    }

    .front:before {
        -webkit-animation: frontShading1 10s infinite linear;
    }

    .back {
        transform: rotateY(180deg) translateZ(75px);
    }

    .bottom {
        transform: rotateX(-90deg) translateZ(75px);
    }

    .top {
        transform: rotateX(90deg) translateZ(75px);
    }

    .right {
        transform: rotateY(90deg) translateZ(75px);
    }

    .left {
        transform: rotateY(-90deg) translateZ(75px);
    }

    .face {
        position: relative;
        background-color: beige;
    }

    .small {
        width: 25px;
        height: 25px;
        border-radius: 15px;
    }

    .large {
        width: 150px;
        height: 150px;
        border-radius: 25px;
    }

    .point {
        position: absolute;
        width: 20%;
        height: 20%;
        background-color: #000000;
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