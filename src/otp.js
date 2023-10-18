// Retrieve stored OTP and mobile number from localStorage
var storedOTP = localStorage.getItem('storedotp');
var storedMobileNumber = localStorage.getItem('mobileNumber');

// Set the input values from localStorage
document.getElementById("mobileNumber").value = storedMobileNumber || '';
document.getElementById("otp").value = storedOTP || '';

function verifyOTP() {
    var enteredMobileNumber = document.getElementById("mobileNumber").value;
    var enteredOTP = document.getElementById("otp").value;

    // Prepare the data to be sent in the request body
    var data = {
        mobileNumber: enteredMobileNumber,
        otp: enteredOTP
    };

    // Determine the API endpoint based on the route
    var apiUrl = window.location.href.includes('verify/login') ? 'https://kv-varlu.vercel.app/api/v1/verify/login' : 'https://kv-varlu.vercel.app/api/v1/verify/otp';

    // Send a POST request to the appropriate API endpoint for OTP verification
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(response => {
            if (response) {
                document.getElementById("verification-status").innerText = "OTP Verified Successfully!";
                // Redirect to success page after 3 seconds
                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 3000);
            } else {
                document.getElementById("verification-status").innerText = "Invalid OTP or Mobile Number. Please try again.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById("verification-status").innerText = "Error occurred while verifying OTP. Please try again later.";
        });
}
