// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');
    const totalAmountElement = document.getElementById('total-price'); // Element to show total price

    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay(); // Initialize cart display on page load

    // Function to update the cart count and total price
    function updateCartDisplay() {
        let totalAmount = 0;

        // Update cart count
        cartCountElement.textContent = cart.length;

        // Calculate total price
        cart.forEach(item => {
            totalAmount += parseInt(item.price, 10);
        });

        // Update total price display
        if (totalAmountElement) {
            totalAmountElement.textContent = `Total Price: Rs. ${totalAmount}`;
        }
    }

    // Add to Cart button event listener
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-name');
            const itemPrice = this.getAttribute('data-price');

            if (itemName && itemPrice) {
                const item = { name: itemName, price: itemPrice };
                cart.push(item);
                localStorage.setItem('cart', JSON.stringify(cart));

                updateCartDisplay();
                alert(`${itemName} added to cart!`);
            } else {
                console.error('Missing data attributes for add-to-cart button.');
            }
        });
    });
});
