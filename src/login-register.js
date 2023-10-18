
function toggleForm() {
    var loginContainer = document.querySelector('.login-container');
    var registrationContainer = document.querySelector('.registration-container');

    if (loginContainer.style.display === 'none') {
        loginContainer.style.display = 'block';
        registrationContainer.style.display = 'none';
    } else {
        loginContainer.style.display = 'none';
        registrationContainer.style.display = 'block';
    }
}

function login() {
    var mobileNumber = document.getElementById("loginMobileNumber").value;
    console.log(mobileNumber);
    fetch('https://kv-varlu.vercel.app/api/v1/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobileNumber: mobileNumber
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Check if the response contains an OTP and message
            if (data.otp && data.message === 'OTP generated and sent to the user') {

                // Store the OTP and mobile number in localStorage as strings
                localStorage.setItem('storedotp', data.otp);
                localStorage.setItem('mobileNumber', mobileNumber);

                setTimeout(function () {

                    // Redirect to success page after 1 seconds
                    window.location.href = 'otp.html';
                }, 1000);

                // Proceed with further actions, such as showing an OTP input field
                // or navigating to the OTP verification page

            } else {
                console.error('Error: OTP generation failed or invalid response structure');
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function register() {
    var mobileNumber = document.getElementById("regMobileNumber").value;
    var errorMessage = document.getElementById("error-message");

    // Validate mobile number (simple validation for demonstration purposes)
    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
        errorMessage.innerText = "Invalid mobile number. Please enter a 10-digit number.";
        return;
    }

    // Clear previous error messages
    errorMessage.innerText = "";

    fetch('https://kv-varlu.vercel.app/api/v1/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mobileNumber: mobileNumber
        })
    })
        .then(res => res.json())
        .then(data => {
            console.log('API Response:', data); 

            if (data) {
                var user = data.user;
                localStorage.setItem('storedotp', String(user.otp));
                localStorage.setItem('mobileNumber', user.mobileNumber);
                console.log('Stored OTP in localStorage:', localStorage.getItem('storedotp'));

                // Redirect to OTP verification page
                setTimeout(function () {
                    // Redirect to success page after 1 seconds
                    window.location.href = 'otp.html';
                }, 1000);
            } else {
                console.error('Error: Invalid OTP data in the API response.', data);
                errorMessage.innerText = "Error: Invalid OTP data in the API response.";
            }
        })
        .catch(error => {
            console.error('Error occurred while processing the API response:', error);
            errorMessage.innerText = "Error occurred while processing your request. Please try again later.";
        });
}

