import "./TarjetaLibro.js";

const API_URL = "http://localhost:8080/api/libros";

class PanelBiblioteca extends HTMLElement {
	connectedCallback() {
		this.render();
		this.formulario = this.querySelector(".formulario-registro form");
		this.formulario.addEventListener("submit", (event) => this.registrarLibro(event));
		this.cargarLibros();
	}

	render() {
		this.innerHTML = `
			<section class="formulario-registro">
				<h1>Biblioteca</h1>
				<form>
					<label for="titulo">Título</label>
					<input id="titulo" name="titulo" type="text" required>

					<label for="autor">Autor</label>
					<input id="autor" name="autor" type="text" required>

					<label for="categoria">Categoría</label>
					<input id="categoria" name="categoria" type="text">

					<label for="anioPublicacion">Año de publicación</label>
					<input id="anioPublicacion" name="anioPublicacion" type="number" max="2026">

					<label for="resena">Reseña</label>
					<textarea id="resena" name="resena"></textarea>

					<label>
						<input name="leido" type="checkbox">
						Libro leído
					</label>

					<button class="btn" type="submit">Agregar libro</button>
				</form>
			</section>
			<section>
				<h2>Catálogo</h2>
				<div class="catalogo-grid"></div>
			</section>
		`;
	}

	async cargarLibros() {
		try {
			const respuesta = await fetch(API_URL);
			if (!respuesta.ok) {
				throw new Error(`HTTP error: ${respuesta.status}`);
			}

			const libros = await respuesta.json();
			const catalogo = this.querySelector(".catalogo-grid");
			catalogo.replaceChildren();

			libros.forEach((libro) => {
				const tarjeta = document.createElement("tarjeta-libro");
				tarjeta.dataset.titulo = libro.titulo;
				tarjeta.dataset.autor = libro.autor;
				tarjeta.dataset.anio = libro.anioPublicacion;
				tarjeta.dataset.categoria = libro.categoria;
				tarjeta.dataset.leido = libro.leido;
				tarjeta.dataset.resena = libro.resena;
				catalogo.appendChild(tarjeta);
			});
		} catch (error) {
			console.error("Error al cargar libros:", error);
		}
	}

	async registrarLibro(event) {
		event.preventDefault();

		const formulario = event.currentTarget;
		const datos = new FormData(formulario);
		const titulo = datos.get("titulo").trim();
		const autor = datos.get("autor").trim();

		if (!titulo || !autor) {
			alert("El título y el autor son obligatorios.");
			return;
		}

		const nuevoLibro = {
			titulo,
			autor,
			categoria: datos.get("categoria").trim(),
			anioPublicacion: Number(datos.get("anioPublicacion")),
			leido: datos.get("leido") === "on",
			resena: datos.get("resena").trim()
		};

		try {
			const respuesta = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(nuevoLibro)
			});

			if (respuesta.status === 201) {
				formulario.reset();
				await this.cargarLibros();
			} else if (respuesta.status === 400) {
				const mensaje = await respuesta.text();
				alert(`Error de validación: ${mensaje}`);
			} else {
				console.error(`Error inesperado en el servidor: ${respuesta.status}`);
			}
		} catch (error) {
			console.error("Error de red:", error);
		}
	}
}

customElements.define("panel-biblioteca", PanelBiblioteca);
