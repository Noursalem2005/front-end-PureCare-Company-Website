document.addEventListener('DOMContentLoaded', function() {
    // Get the amount from the query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const amount = urlParams.get('amount');
    document.getElementById('amount').value = amount;

    // PayPal payment handling
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: amount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Payment successful!');
                // Optionally, you can send the payment details to your server for further processing
            });
        },
        onError: function(err) {
            console.error(err);
            alert('Payment failed. Please try again.');
        }
    }).render('#paypal-button-container');
});