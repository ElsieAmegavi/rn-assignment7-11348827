# rn-assignment7-11348827

# rn-assignment6-12345678

# Elsie Loise Amegavi

This React Native project is an e-commerce application that features a product catalogue and a checkout page. The app allows users to browse products, add them to a cart, and manage the cart items.

## Project Structure

The app contains two main pages: `HomePage` and `CheckoutPage`, navigated using React Navigation's stack navigator.

### HomePage.js

The `HomePage.js` page displays a catalogue of products in a grid format. Users can add products to the cart, and the cart items are stored using `AsyncStorage`.

**Features:**

- **Product Catalogue:** Displays a list of products with images, labels, descriptions, and prices.
- **Add to Cart:** Allows users to add products to the cart. If the product is already in the cart, it is not added again.
- **Header:** Contains logo, menu, search, and shopping bag icons.
- **Navigation to Checkout:** Provides a button to navigate to the checkout page.

**Components:**

- `Header`: Displays the logo, menu, search, and shopping bag icons.
- `Catalogue`: Displays products in a grid format with images, labels, descriptions, and prices.
- `Add to Cart`: Button to add products to the cart.

![HomePage 1](./Fashion-app/assets/new1.jpg)
![HomePage 2](./Fashion-app/assets/new3.jpg)


### CheckoutPage.js

The `CheckoutPage.js` page displays the items in the cart. Users can remove items from the cart, and the cart items are updated in AsyncStorage.

**Features:**

- **View Cart Items:** Displays the list of products added to the cart.
- **Remove from Cart:** Allows users to remove products from the cart. The updated cart is stored in AsyncStorage.
- **Header:** Contains logo and search icons.
Components:

- `Header`: Displays the logo and search icons.
- `Cart Items`: Displays products in a list format with images, labels, descriptions, and prices.
- `Remove from Cart`: Button to remove products from the cart.

![Checkout 1](./Fashion-app/assets/new2.jpg)
![Checkout 2](./Fashion-app/assets/checkout2.jpg)
