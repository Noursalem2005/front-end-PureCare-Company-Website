document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        if (validateForm()) {
            const formData = new FormData(form);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                medical_issue: formData.get('medical_issue'),
                preferred_contact: formData.get('preferred_contact')
            };

            try {
                const response = await fetch('http://localhost:8000/submit-form', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error:', errorData);
                    alert('Submission failed: ' + (errorData.error || 'An unknown error occurred.'));
                } else {
                    alert('Form submitted successfully!');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting the form.');
            }
        }
    });

    // Initialize intl-tel-input
    const phoneInputField = document.querySelector("#phone");
    const phoneInput = window.intlTelInput(phoneInputField, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch('https://ipinfo.io/json?token=2cae29241ece79') // Replace with your actual token
                .then((resp) => resp.json())
                .then((data) => {
                    const countryCode = (data && data.country) ? data.country : "us";
                    callback(countryCode);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    callback("us"); // Default to "us" if there's an error
                });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
    });

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        // Clear previous error messages
        clearErrors();

        // Validate name
        if (name.value.trim() === '' || name.value.length < 2) {
            showError(name, 'Name must be at least 2 characters long.');
            isValid = false;
        }

        // Validate email
        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate phone
        if (!phoneInput.isValidNumber()) {
            showError(phone, 'Please enter a valid phone number.');
            isValid = false;
        }

        return isValid;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = document.createElement('div');
        error.className = 'error-message';
        error.innerText = message;
        formGroup.appendChild(error);
    }

    function clearErrors() {
        const errors = document.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }
});