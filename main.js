const app = new Vue({
    el: '#app',
    data: {
        estadoModal: false,
        personajeActual: null,
        titulo: 'Personaje de Rick and Morty',
        personajes: [],
        storage: []
    },

    methods: {
        guardarLocalStorage() {
            localStorage.setItem("personajes", JSON.stringify(this.personajes));
        },
        guardarPersonajeLocal(data, url) {
            const personaje = {...data, url};
            const storage = JSON.parse(localStorage.getItem("storage"));
            if (storage) {
                storage.push(personaje);
                this.storage = storage;
            } else {
                this.storage.push(personaje);
            }
            localStorage.setItem("storage", JSON.stringify(this.storage));
        },
        obtenerPersonajeStorage(url) {
            const storage = JSON.parse(localStorage.getItem("storage"));
            if(storage) {
                const personaje = storage.find(personaje => personaje.url === url);
                if(personaje) {
                    return personaje;
                } else {
                    return;
                }
            } else {
                return;
            }
        },
        obtenerLocalStorage() {
            const personajes = localStorage.getItem("personajes");
            const storage = localStorage.getItem("storage");
            if (personajes) {
                this.personajes = JSON.parse(personajes);
            }
            if (storage) {
                this.storage = JSON.parse(storage);
            }
        },
        mostrarModal() {
            this.estadoModal = true;
        },
        ocultarModal() {
            this.estadoModal = false;
        },
        verPersonaje(url) {
            const personaje = this.obtenerPersonajeStorage(url);
            if (personaje) {
              this.personajeActual = personaje;
              this.mostrarModal();
            } else {
              fetch(url)
                .then(response => response.json())
                .then(data => {
                  this.personajeActual = {
                    name: data.name,
                    status: data.status,
                    species: data.species,
                    gender: data.gender
                  };
                  this.guardarPersonajeLocal(this.personajeActual, url);
                  this.mostrarModal();
                });
            }
          }
    },
    async mounted() {
        this.obtenerLocalStorage();
        if(this.personajes.length === 0) {
            const response = await fetch("https://rickandmortyapi.com/api/character/?page=1&status=alive");
            const data = await response.json();
            this.personajes = data.results;
            this.guardarLocalStorage();
        }
    }
}
);
