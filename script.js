const apiUrl =
  "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

function fetchData() {
  return fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      products = data;
      showProducts("Men"); // Display initial products for men on page load
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function showProducts(category) {
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";

  products.categories.forEach((cat) => {
    if (cat.category_name === category) {
      // Loop through the products in the category
      let productList = cat.category_products;
      console.log(productList);
      productList.forEach((product) => {
        console.log(product);
        const card = document.createElement("div");
        card.classList.add("card");

        // Add your code here to display the product details in the card
        const discountPercentage = Math.round(
          ((product.compare_at_price - product.price) /
            product.compare_at_price) *
            100
        );

        card.innerHTML = `
           <span class="badge">${product.badge_text}</span>
            <img src="${product.image}" alt="${product.title}">
            <h2 class ="title">${product.title}</h2>
            <p class = "vender"> ${product.vendor}</p>
            <div class="priceTotal">
            <p class="price">$${product.price}</p>
            <p class="comparePrice"> $${product.compare_at_price}</p>
            <p class="percentage"> ${discountPercentage}%off</p>
            </div>
            <button class="addToCart">Add to Cart</button>
        `;

        productContainer.appendChild(card);
      });
    }
  });
}

// Call the fetchData function to initiate the data fetch when the page loads
fetchData();
