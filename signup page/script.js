function signUp() {
    const enrollInput = document.getElementById('enroll').value;

    if (enrollInput.length != 12) {
        alert('Enrollment should have exactly 12 digits!');
    }
    else {
        // Get the input values from the sign-up form
        var name = document.getElementById('name').value;
        var enroll = document.getElementById('enroll').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        // Create an object to store the user details
        var userDetails = {
            name: name,
            enroll: enroll,
            email: email,
            password: password
        };

        var storedUserDetails = localStorage.getItem('userDetails');
        var users = [];

        if (storedUserDetails) {
            // Parse the stored user details
            users = JSON.parse(storedUserDetails);
        }

        users.push(userDetails);

        // Store the user details in localStorage
        localStorage.setItem('userDetails', JSON.stringify(users));

        document.getElementById('myForm').reset();

        // Redirect to login page
        window.location.href = '../login/index.html';
    }
}