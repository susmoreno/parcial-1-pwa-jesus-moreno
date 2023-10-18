const app = new Vue({
    el: '#app',
    data: {
        estadoModal: false,
        pokemonActual: null,
        titulo: 'Personaje de Rick and Morty',
        personajes: [],
        storage: []
    },

    methods: {

        guardarPersonaje(data, url){
            const personaje = {...data, url};
            const historial = JSON.parse(localStorage.getItem("storage"));
        }
    }
})