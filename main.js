const app = new Vue({
    el: '#app',
    data: {
        estadoModal: false,
        personajeElegido: null,
        titulo: 'Personaje de Rick and Morty',
        personajes: [],
        storage: []
    },
    methods: {
        guardarLocalStorage() {
            localStorage.setItem("personajes", JSON.stringify(this.personajes));
        },
        guardarPersonajeLocal(data, url) {
            const personaje = { ...data, url };
            const storage = JSON.parse(localStorage.getItem("storage")) || [];

            storage.push(personaje);
            this.storage = storage;

            localStorage.setItem("storage", JSON.stringify(storage));
        },
        obtenerPersonajeStorage(url) {
            const storage = JSON.parse(localStorage.getItem("storage")) || [];

            const personaje = storage.find(personaje => personaje.url === url);
            return personaje || null;
        },
        obtenerLocalStorage() {
            try {
                const personajes = localStorage.getItem("personajes");
                const storage = localStorage.getItem("storage") || [];
        
                console.log('Datos en el localStorage - personajes:', personajes);
                console.log('Datos en el localStorage - storage:', storage);
        
                this.personajes = personajes ? JSON.parse(personajes) : [];
                this.storage = storage ? JSON.parse(storage) : [];
            } catch (error) {
                console.error('Error al analizar JSON:', error);
            }
        },
        mostrarModal() {
            this.estadoModal = true;
        },
        ocultarModal() {
            this.estadoModal = false;
        },
        verPersonaje(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const { name, status, species, image, gender } = data;
                    this.personajeElegido = { name, status, species, image, gender };
                    
                    console.log('Añadiendo personaje al localStorage:', this.personajeElegido);
        
                    this.guardarPersonajeLocal(this.personajeElegido, url);
                    this.mostrarModal();
                });
        }
    },
    async mounted() {
        this.obtenerLocalStorage();
        if (this.personajes.length === 0) {
            const response = await fetch("https://rickandmortyapi.com/api/character/?page=1&status=alive");
            const data = await response.json();
            this.personajes = data.results;
            this.guardarLocalStorage();
        }
    }
});
