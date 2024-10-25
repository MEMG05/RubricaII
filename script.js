const apiUrl = "https://fakestoreapi.com/products";
const productContainer = document.getElementById("product-container");
const filter = document.getElementById("filter");

// Llamando los productos desde la API
async function fetchProducts() {
	const response = await fetch(apiUrl);
	const products = await response.json();
	renderProducts(products);
	populateFilter(products);
}

// Ingresando los productos en manera de lectura
function renderProducts(products) {
	productContainer.innerHTML = "";
	products.forEach((product) => {
		const card = document.createElement("div");
		card.className =
			"flex overflow-hidden flex-col p-4 bg-white rounded-lg border shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300 ease-in-out";
		card.innerHTML = `
            <img class="object-cover w-full h-80" src="${product.image}" alt="${product.title}">
            <div class="flex-grow mt-2">
                <h2 class="text-lg font-bold">${product.title}</h2>
                <p class="mt-2 text-gray-700">Precio: $${product.price}</p>
            </div>
        `;
		productContainer.appendChild(card);
	});
}

// filtrando los productos para su busqueda
function populateFilter(products) {
	products.forEach((product) => {
		const option = document.createElement("option");
		option.value = product.id;
		option.textContent = product.title;
		filter.appendChild(option);
	});
}

// Seleccionando de Acuerdo a su Id
filter.addEventListener("change", () => {
	const selectedId = filter.value;
	fetch(apiUrl)
		.then((response) => response.json())
		.then((products) => {
			const filteredProducts =
				selectedId === "all"
					? products
					: products.filter((product) => product.id == selectedId);
			renderProducts(filteredProducts);
		});
});

fetchProducts();
