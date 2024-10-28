document.addEventListener('DOMContentLoaded', function() {
    const cartCountElement = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmountElement = document.getElementById('total-price');
    
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartDisplay();

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let totalAmount = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            totalAmountElement.textContent = 'Total Price: Rs. 0';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <p>${item.name} - Rs. ${item.price}</p>
                    <button class="remove-from-cart" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(itemElement);
                totalAmount += parseInt(item.price, 10) || 0;
            });
            totalAmountElement.textContent = `Total Price: Rs. ${totalAmount}`;
        }
        cartCountElement.textContent = cart.length;
    }

    // Function to add an item to the cart
    function addToCart(item) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Event listener for add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = {
                name: this.getAttribute('data-name'),
                price: this.getAttribute('data-price')
            };
            addToCart(item);
        });
    });

    // Event delegation for remove buttons
    cartItemsContainer.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-from-cart')) {
            const index = parseInt(event.target.getAttribute('data-index'), 10);
            if (index >= 0 && index < cart.length) {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            } else {
                console.error('Invalid index for remove-from-cart button.');
            }
        }
    });
});
