const template = document.createElement("template");

template.innerHTML = `
	<style>
		:host {
			display: block;
			container-type: inline-size;
			container-name: tarjeta;
		}

		.libro-card {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
			padding: 1.25rem;
			border: 1px solid #cbd5e1;
			border-radius: 8px;
			background: #ffffff;
			color: #172033;
			font-family: system-ui, sans-serif;
		}

		.libro-card h2 {
			grid-column: 1 / -1;
			margin: 0;
			color: #0f766e;
			font-size: 1.25rem;
		}

		.campo {
			margin: 0;
		}

		.etiqueta {
			display: block;
			margin-bottom: 0.25rem;
			color: #64748b;
			font-size: 0.8rem;
			font-weight: 700;
			text-transform: uppercase;
		}

		@container tarjeta (max-width: 349px) {
			.libro-card {
				grid-template-columns: 1fr;
				padding: 0.85rem;
				background: #172033;
				color: #f8fafc;
				font-size: 0.85rem;
			}

			.libro-card h2 {
				color: #5eead4;
				font-size: 1rem;
			}

			.etiqueta {
				color: #99f6e4;
				font-size: 0.7rem;
			}
		}
	</style>

	<article class="libro-card">
		<h2><slot name="titulo">Sin título</slot></h2>
		<p class="campo"><span class="etiqueta">Autor</span><slot name="autor">Anónimo</slot></p>
		<p class="campo"><span class="etiqueta">Año</span><slot name="anio">N/A</slot></p>
		<p class="campo"><span class="etiqueta">Categoría</span><slot name="categoria">N/A</slot></p>
		<p class="campo"><span class="etiqueta">Estado</span><slot name="leido">N/A</slot></p>
		<p class="campo"><span class="etiqueta">Reseña</span><slot name="resena">Sin reseña</slot></p>
	</article>
`;

class TarjetaLibro extends HTMLElement {
	static get observedAttributes() {
		return ["data-titulo", "data-autor", "data-anio", "data-categoria", "data-leido", "data-resena"];
	}

	constructor() {
		super();
		this.attachShadow({ mode: "open" });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (oldValue !== newValue && this.shadowRoot) {
			this.render();
		}
	}

	render() {
		const datos = [
			["titulo", this.dataset.titulo || "Sin título"],
			["autor", this.dataset.autor || "Anónimo"],
			["anio", this.dataset.anio || "N/A"],
			["categoria", this.dataset.categoria || "N/A"],
			["leido", this.dataset.leido === "true" ? "Leído" : "Pendiente"],
			["resena", this.dataset.resena || "Sin reseña"]
		];

		this.replaceChildren(...datos.map(([slot, valor]) => {
			const elemento = document.createElement("span");
			elemento.slot = slot;
			elemento.textContent = valor;
			return elemento;
		}));
	}
}

customElements.define("tarjeta-libro", TarjetaLibro);
