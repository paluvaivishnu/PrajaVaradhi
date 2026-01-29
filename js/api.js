// API base URL
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : '/api';

// API helper function
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            }
        };

        // Add authorization token if exists
        const token = localStorage.getItem('authToken');
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add body for POST/PUT requests
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API request failed');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Authentication APIs
const AuthAPI = {
    // Sign up new user
    async signup(userData) {
        return await apiCall('/auth/signup', 'POST', userData);
    },

    // Login user
    async login(credentials) {
        return await apiCall('/auth/login', 'POST', credentials);
    },

    // Get current user
    async getCurrentUser() {
        return await apiCall('/auth/me', 'GET');
    },

    // Forgot password
    async forgotPassword(data) {
        return await apiCall('/auth/forgotpassword', 'POST', data);
    },

    // Reset password
    async resetPassword(token, password) {
        return await apiCall(`/auth/resetpassword/${token}`, 'PUT', { password });
    },

    // Logout
    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPhone');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        window.location.href = 'index.html';
    }
};

// Issue APIs
const IssueAPI = {
    // Get all issues
    async getAll() {
        return await apiCall('/issues', 'GET');
    },

    // Get issue by ID
    async getById(id) {
        return await apiCall(`/issues/${id}`, 'GET');
    },

    // Create new issue
    async create(issueData) {
        return await apiCall('/issues', 'POST', issueData);
    },

    // Update issue
    async update(id, updateData) {
        return await apiCall(`/issues/${id}`, 'PUT', updateData);
    },

    // Delete issue
    async delete(id) {
        return await apiCall(`/issues/${id}`, 'DELETE');
    },

    // Get user's issues
    async getUserIssues(userId) {
        return await apiCall(`/issues/user/${userId}`, 'GET');
    },

    // Add progress update to issue
    async addProgress(id, progressData) {
        return await apiCall(`/issues/${id}/progress`, 'POST', progressData);
    }
};

// Utility functions
const Utils = {
    // Check if user is logged in
    isLoggedIn() {
        return !!localStorage.getItem('authToken');
    },

    // Get current user role
    getUserRole() {
        return localStorage.getItem('role') || 'citizen';
    },

    // Redirect to login if not authenticated
    requireAuth() {
        if (!this.isLoggedIn()) {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Redirect to admin page if admin
    requireAdmin() {
        if (!this.isLoggedIn() || this.getUserRole() !== 'admin') {
            window.location.href = 'login.html';
            return false;
        }
        return true;
    },

    // Show loading spinner
    showLoading(buttonElement, originalText = 'Submit') {
        buttonElement.disabled = true;
        buttonElement.dataset.originalText = originalText;
        buttonElement.innerHTML = '<span>Loading...</span>';
    },

    // Hide loading spinner
    hideLoading(buttonElement) {
        buttonElement.disabled = false;
        const originalText = buttonElement.dataset.originalText || 'Submit';
        buttonElement.textContent = originalText;
    },

    // Show success message
    showSuccess(message) {
        alert('✅ ' + message);
    },

    // Show error message
    showError(message) {
        alert('❌ ' + message);
    },

    // Format date
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Generate unique ID
    generateId(prefix = 'ID') {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `${prefix}${timestamp}${random}`;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthAPI, IssueAPI, Utils, API_BASE_URL };
}
