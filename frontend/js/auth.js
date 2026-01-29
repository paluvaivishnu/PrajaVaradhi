// Signup function - connects to MongoDB backend
async function signup() {
    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const termsAccepted = document.getElementById("terms").checked;
    const signupBtn = document.querySelector('.signup-btn');

    // Validation
    if (!name || !email || !phone || !password || !confirmPassword) {
        Utils.showError("Please fill all fields");
        return;
    }

    // Email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
        Utils.showError("Please enter a valid email address");
        return;
    }

    // Phone validation (10 digits)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
        Utils.showError("Please enter a valid 10-digit phone number");
        return;
    }

    // Password validation
    if (password.length < 6) {
        Utils.showError("Password must be at least 6 characters long");
        return;
    }

    if (password !== confirmPassword) {
        Utils.showError("Passwords do not match");
        return;
    }

    if (!termsAccepted) {
        Utils.showError("Please accept terms & conditions");
        return;
    }

    // Show loading
    Utils.showLoading(signupBtn, 'Sign Up');

    try {
        // Call signup API
        const userData = {
            name: name,
            email: email,
            phone: phone,
            password: password
        };

        const response = await AuthAPI.signup(userData);

        // Hide loading
        Utils.hideLoading(signupBtn);

        if (response.success) {
            Utils.showSuccess("Account created successfully! Please login.");
            // Redirect to login page
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1000);
        }
    } catch (error) {
        Utils.hideLoading(signupBtn);
        Utils.showError(error.message || "Signup failed. Please try again.");
    }
}

// Login function - connects to MongoDB backend
async function login() {
    const user = document.getElementById("user").value.trim();
    const password = document.getElementById("pass").value;
    const loginBtn = document.querySelector('.login-btn');

    if (!user || !password) {
        Utils.showError("Please fill all fields");
        return;
    }

    // Show loading
    Utils.showLoading(loginBtn, 'Sign In');

    try {
        // Determine if input is email or phone
        const isEmail = user.includes('@');
        const credentials = {
            password: password
        };

        if (isEmail) {
            credentials.email = user;
        } else {
            credentials.phone = user;
        }

        // Call login API
        const response = await AuthAPI.login(credentials);

        // Hide loading
        Utils.hideLoading(loginBtn);

        if (response.success && response.token) {
            // Store auth token
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userId', response.user._id);
            localStorage.setItem('userName', response.user.name);
            localStorage.setItem('userEmail', response.user.email);
            localStorage.setItem('userPhone', response.user.phone);
            localStorage.setItem('role', response.user.role);
            localStorage.setItem('userDistrict', response.user.district || '');

            Utils.showSuccess(`Welcome back, ${response.user.name}!`);

            // Redirect based on role
            setTimeout(() => {
                if (response.user.role === 'admin') {
                    window.location.href = 'publicrepresentative-dashboard.html';
                } else if (response.user.role === 'moderator') {
                    window.location.href = 'moderator-dashboard.html';
                } else {
                    window.location.href = 'citizen-dashboard.html';
                }
            }, 1000);
        }
    } catch (error) {
        Utils.hideLoading(loginBtn);
        Utils.showError(error.message || "Login failed. Please check your credentials.");
    }
}

// Handle Enter key press for login
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        login();
    }
}

// Forgot password function
async function handleForgotPassword() {
    const user = document.getElementById("user").value.trim();
    if (!user) {
        Utils.showError("Please enter your email or phone first");
        return;
    }

    try {
        const response = await AuthAPI.forgotPassword({ user });
        if (response.success) {
            // In simulation mode, we get the token back and automatically "fill" it for the user
            // In a real app, the user would check their email.
            Utils.showSuccess("SIMULATION: Reset token generated. Redirecting to reset page...");
            setTimeout(() => {
                window.location.href = `reset-password.html?token=${response.resetToken}`;
            }, 1500);
        }
    } catch (error) {
        Utils.showError(error.message || "Failed to process request");
    }
}

// Reset password function
async function handleResetPassword() {
    const password = document.getElementById("new-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const resetBtn = document.querySelector('.reset-btn');

    if (!password || !confirmPassword) {
        Utils.showError("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        Utils.showError("Passwords do not match");
        return;
    }

    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        Utils.showError("Invalid or missing reset token");
        return;
    }

    Utils.showLoading(resetBtn, 'Reset Password');

    try {
        const response = await AuthAPI.resetPassword(token, password);
        Utils.hideLoading(resetBtn);

        if (response.success) {
            Utils.showSuccess("Password reset successful! Redirecting to login...");
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        }
    } catch (error) {
        Utils.hideLoading(resetBtn);
        Utils.showError(error.message || "Failed to reset password");
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    // Add enter key listener to password field if on login page
    const passwordField = document.getElementById('pass');
    if (passwordField) {
        passwordField.addEventListener('keypress', handleEnterKey);
    }

    // Add enter key listener to confirm password field if on signup page
    const confirmPasswordField = document.getElementById('confirmPassword');
    if (confirmPasswordField) {
        confirmPasswordField.addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                signup();
            }
        });
    }
});
