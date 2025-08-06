// Get the button element
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// When the user scrolls down 200px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block"; // Show the button
    } else {
        scrollToTopBtn.style.display = "none"; // Hide the button
    }
}

// When the user clicks on the button, scroll to the top of the document
scrollToTopBtn.addEventListener("click", function() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
});
// --- FAQ Accordion Functionality ---
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        // Get the parent .faq-item of the clicked question
        const faqItem = question.closest('.faq-item');
        // Get the .faq-answer div within this specific faq-item
        const faqAnswer = faqItem.querySelector('.faq-answer');

        // Toggle the 'active' class on the faq-item
        faqItem.classList.toggle('active');

        // Set max-height for accordion animation
        if (faqItem.classList.contains('active')) {
            // When opening, set max-height to the actual scroll height of the content
            // This ensures it expands exactly to the content's size
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 'px';
        } else {
            // When closing, set max-height back to 0
            faqAnswer.style.maxHeight = '0';
        }
    });
});
// Global variables to manage the cart
let cart = []; // An array to store items in the cart
let total = 0; // The total price of items in the cart

// Get references to HTML elements
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalAmountSpan = document.getElementById('cart-total-amount');
const paypalBtn = document.getElementById('paypal-btn');
const cardBtn = document.getElementById('card-btn');
const cardInfoForm = document.getElementById('card-info-form');
const confirmPaymentBtn = document.querySelector('#card-info-form .confirm-payment-btn'); // Selects button inside form

// --- Functions to update the cart display ---

function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Clear current cart display

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <span>${item.name}</span>
                <span>₦${item.price.toLocaleString()}</span>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    cartTotalAmountSpan.textContent = total.toLocaleString(); // Update total amount
}

// --- Event Listeners ---

// Add to Cart buttons
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const serviceName = button.dataset.service;
        const servicePrice = parseFloat(button.dataset.price); // Convert price to a number

        // Add item to cart array
        cart.push({ name: serviceName, price: servicePrice });
        total += servicePrice; // Add to total

        // Update the cart display
        updateCartDisplay();

        // Optional: Provide instant feedback without alert
        button.textContent = 'Added!';
        button.style.backgroundColor = '#28a745'; // Green for added
        button.disabled = true; // Disable button after adding (optional, for simple cart)

        setTimeout(() => { // Reset button after a short delay
            button.textContent = 'Add to Cart';
            button.style.backgroundColor = '#4CAF50';
            button.disabled = false;
        }, 1500); // 1.5 seconds
    });
});

// PayPal Button
paypalBtn.addEventListener('click', () => {
    if (total === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }
    alert('Redirecting to PayPal for secure payment... (Simulated)');
    // In a real app: window.location.href = 'https://paypal.com/checkout?amount=' + total;
    // Or integrate with a PayPal SDK
});

// Card Button
cardBtn.addEventListener('click', () => {
    if (total === 0) {
        alert('Your cart is empty! Please add items before checking out.');
        return;
    }
    cardInfoForm.style.display = 'block'; // Show the card form
    // In a real app: You'd typically integrate with a payment gateway's card form
});

// Confirm Payment Button (inside card form)
confirmPaymentBtn.addEventListener('click', () => {
    // In a real app, you'd validate inputs and send to payment gateway
    alert('Processing card payment... (Simulated)');
    // Hide form after "payment"
    cardInfoForm.style.display = 'none';
    // Clear cart after "payment"
    cart = [];
    total = 0;
    updateCartDisplay();
    alert('Payment successful and cart cleared! Thank you for your purchase. (Simulated)');
});

// Initialize display when page loads
updateCartDisplay();