function login() {
    var enroll = document.getElementById('enroll').value;
    var password = document.getElementById('password').value;

    var storedUserDetails = localStorage.getItem('userDetails');

    if (storedUserDetails) {
        var users = JSON.parse(storedUserDetails);

        // Find the user with matching enrollment number and password
        var foundUser = users.find(function (user) {
            return user.enroll === enroll && user.password === password;
        });

        // Check if the entered enroll and password match the stored details
        if (foundUser) {
            alert('Login successful!'); 
            // Redirect to home page 
            console.log("hello");
            window.location.href = '../home/index.html';

            // Clear the login form
            document.getElementById('myForm').reset();
        } else {
            alert('Invalid enrollment number or password!');
        }
    }
    else {
        // Display an error message if the user details are not found
        alert('User details not found!');
    }
}
