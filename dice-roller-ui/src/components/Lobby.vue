<template>
    <form @submit="validateForm" novalidate>
        <div>
            <p v-bind:key="error" v-for="error of errors">{{error}}</p>
        </div>
        <input v-model="username" type="text" placeholder="Player name" required>
        <input v-model="colorPicked" list="css-color-names" placeholder="Blue" required>
        <datalist id="css-color-names">
            <option v-bind:key="name" v-for="(hexa,name) in colors">{{name}}</option>
        </datalist>
        <button type="submit">Let's roll</button>
    </form>
</template>

<script>
    import cssColorNames from 'css-color-names';

    export default {
        name: "Lobby",
        data() {
            return {
                errors: [],
                username: '',
                colorPicked: '',
                colors: cssColorNames
            }
        },
        methods: {
            validateForm(form) {
                this.errors = [];
                if (!this.username) {
                    this.errors.push('A player name is required. Anything but nothing will be accepted.');
                }
                if (!Object.keys(this.colors).find(color => color === this.colorPicked)) {
                    this.errors.push('A color is required. Start typing to get ideas.');
                }
                if (this.errors.length === 0) {
                    let playerInfo = {
                        username: this.username,
                        color: this.colorPicked
                    };
                    this.$store.commit('initPlayerInfo', playerInfo);
                    this.$store.dispatch('initWebSocketConnection', playerInfo);
                    this.$router.push('/dashboard');
                }
                form.preventDefault();
            }
        }
    }
</script>

<style scoped>

</style>