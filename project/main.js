document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginContainer = document.querySelector('.login-container');
    const mainWebsite = document.querySelector('.main-website');
    const contentArea = document.querySelector('.content');
    const navLinks = document.querySelectorAll('.nav-links a');
    let sosActivated = false;

    // Store registered users
    let registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];

    // Toggle password visibility with icon change
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const input = e.target.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            e.target.classList.toggle('fa-eye');
            e.target.classList.toggle('fa-eye-slash');
        });
    });

    // Show registration form
    document.querySelector('.signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        loginContainer.innerHTML = `
            <h1>AASHRAY</h1>
            <p class="tagline">She remembered who she was and the game changed!!</p>
            <form id="registrationForm">
                <div class="form-group">
                    <label for="regFullName">Full Name</label>
                    <input type="text" id="regFullName" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label for="regEmail">Email</label>
                    <input type="email" id="regEmail" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="regPhone">Phone Number</label>
                    <input type="tel" id="regPhone" pattern="[0-9]{10}" required placeholder="Enter your phone number">
                </div>
                <div class="form-group">
                    <label for="regParentPhone">Emergency Contact Number</label>
                    <input type="tel" id="regParentPhone" pattern="[0-9]{10}" required placeholder="Enter emergency contact number">
                </div>
                <div class="form-group">
                    <label for="regAddress">Address</label>
                    <textarea id="regAddress" rows="3" required placeholder="Enter your address"></textarea>
                </div>
                <div class="form-group">
                    <label for="regPassword">Password</label>
                    <div class="password-input">
                        <input type="password" id="regPassword" required placeholder="Create a password">
                        <i class="toggle-password fas fa-eye"></i>
                    </div>
                </div>
                <div class="form-group">
                    <label for="regConfirmPassword">Confirm Password</label>
                    <div class="password-input">
                        <input type="password" id="regConfirmPassword" required placeholder="Confirm your password">
                        <i class="toggle-password fas fa-eye"></i>
                    </div>
                </div>
                <button type="submit" class="sign-in">Register</button>
            </form>
            <p class="signup-text">Already have an account? <a href="#" class="login-link">Login</a></p>
        `;

        // Reattach event listeners
        const registrationForm = document.getElementById('registrationForm');
        registrationForm.addEventListener('submit', handleRegistration);
        document.querySelector('.login-link').addEventListener('click', showLoginForm);
        attachPasswordToggles();
    });

    function attachPasswordToggles() {
        document.querySelectorAll('.toggle-password').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                const input = e.target.previousElementSibling;
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                e.target.classList.toggle('fa-eye');
                e.target.classList.toggle('fa-eye-slash');
            });
        });
    }

    function handleRegistration(e) {
        e.preventDefault();
        
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;

        if (password !== confirmPassword) {
            showNotification('Passwords do not match!', 'error');
            return;
        }

        const newUser = {
            fullName: document.getElementById('regFullName').value,
            email: document.getElementById('regEmail').value,
            phone: document.getElementById('regPhone').value,
            parentPhone: document.getElementById('regParentPhone').value,
            address: document.getElementById('regAddress').value,
            password: password
        };

        if (registeredUsers.some(user => user.email === newUser.email)) {
            showNotification('This email is already registered!', 'error');
            return;
        }

        registeredUsers.push(newUser);
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        showNotification('Registration successful! Please login.', 'success');
        setTimeout(showLoginForm, 1500);
    }

    function showLoginForm(e) {
        e?.preventDefault();
        loginContainer.innerHTML = `
            <h1>AASHRAY</h1>
            <p class="tagline">She remembered who she was and the game changed!!</p>
            <form id="loginForm">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required placeholder="Enter your email">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <div class="password-input">
                        <input type="password" id="password" required placeholder="Enter your password">
                        <i class="toggle-password fas fa-eye"></i>
                    </div>
                </div>
                <button type="submit" class="sign-in">Sign In</button>
            </form>
            <p class="signup-text">Don't have an account? <a href="#" class="signup-link">Sign up</a></p>
        `;

        // Reattach event listeners
        document.querySelector('.signup-link').addEventListener('click', document.querySelector('.signup-link').onclick);
        document.getElementById('loginForm').addEventListener('submit', handleLogin);
        attachPasswordToggles();
    }

    function handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const user = registeredUsers.find(u => u.email === email && u.password === password);

        if (user) {
            showNotification('Login successful!', 'success');
            setTimeout(() => {
                loginContainer.style.display = 'none';
                mainWebsite.style.display = 'block';
                loadPage('home');
            }, 1000);
        } else {
            showNotification('Invalid email or password!', 'error');
        }
    }

    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Navigation and page loading
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = e.target.textContent.toLowerCase();
            loadPage(page);
            
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
        });
    });

    function loadPage(page) {
        let content = '';
        
        switch(page) {
            case 'home':
                content = `
                    <p class="tagline-main">She remembered who she was and the game changed!!</p>
                    <div class="alert-section">
                        <div class="sos-button">
                            <button>${sosActivated ? 'ACTIVATED' : 'SOS'}</button>
                        </div>
                        <h2>Alert Zone</h2>
                        <p class="emergency-text">For Emergency Call: 100</p>
                    </div>
                    <div class="side-panel">
                        <div class="station-info">
                            <h3>Nearby Station</h3>
                            <div class="info-box">
                                <div class="station-details">
                                    <p><strong>Nearest Police Station:</strong> Central Police Station</p>
                                    <p><strong>Distance:</strong> 1.2 km</p>
                                    <p><strong>Contact:</strong> 044-28447777</p>
                                    <p><strong>Address:</strong> 123 Main Street</p>
                                </div>
                            </div>
                        </div>
                        <div class="cases">
                            <h3>Cases till now</h3>
                            <div class="info-box">
                                <div class="case-stats">
                                    <p><strong>Total Cases:</strong> 1,234</p>
                                    <p><strong>Resolved:</strong> 1,180</p>
                                    <p><strong>Response Rate:</strong> 98%</p>
                                    <p><strong>Average Response Time:</strong> 5 mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'about':
                content = `
                    <div class="page-content">
                        <h1>About AASHRAY</h1>
                        <div class="about-section">
                            <h2>Our Mission</h2>
                            <p>AASHRAY is dedicated to providing immediate assistance and support to women in distress. Our platform connects users with emergency services, nearby police stations, and support centers.</p>
                            
                            <h2>How It Works</h2>
                            <div class="features-grid">
                                <div class="feature-card">
                                    <h3>SOS Alert</h3>
                                    <p>One-click emergency alert system that notifies authorities and emergency contacts.</p>
                                </div>
                                <div class="feature-card">
                                    <h3>Location Tracking</h3>
                                    <p>Real-time location sharing with emergency services for quick response.</p>
                                </div>
                                <div class="feature-card">
                                    <h3>24/7 Support</h3>
                                    <p>Round-the-clock helpline and support system.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'records':
                content = `
                    <div class="page-content">
                        <h1>Safety Records</h1>
                        <div class="records-section">
                            <div class="statistics-card">
                                <h3>Emergency Response Time</h3>
                                <div class="stat">
                                    <span class="number">5</span>
                                    <span class="unit">minutes</span>
                                </div>
                                <p>Average response time in urban areas</p>
                            </div>
                            
                            <div class="statistics-card">
                                <h3>Cases Handled</h3>
                                <div class="stat">
                                    <span class="number">1,234</span>
                                    <span class="unit">cases</span>
                                </div>
                                <p>Successfully resolved in 2023</p>
                            </div>

                            <div class="monthly-report">
                                <h3>Monthly Statistics</h3>
                                <table class="stats-table">
                                    <tr>
                                        <th>Month</th>
                                        <th>Alerts</th>
                                        <th>Response Rate</th>
                                    </tr>
                                    <tr>
                                        <td>January</td>
                                        <td>145</td>
                                        <td>98%</td>
                                    </tr>
                                    <tr>
                                        <td>February</td>
                                        <td>132</td>
                                        <td>99%</td>
                                    </tr>
                                    <tr>
                                        <td>March</td>
                                        <td>156</td>
                                        <td>97%</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                break;
            case 'helpdesk':
                content = `
                    <div class="page-content">
                        <h1>24/7 Helpdesk</h1>
                        <div class="helpdesk-section">
                            <div class="emergency-contacts">
                                <h2>Emergency Numbers</h2>
                                <div class="contact-card">
                                    <h3>Police Helpline</h3>
                                    <p class="phone">100</p>
                                </div>
                                <div class="contact-card">
                                    <h3>Women's Helpline</h3>
                                    <p class="phone">1091</p>
                                </div>
                                <div class="contact-card">
                                    <h3>Ambulance</h3>
                                    <p class="phone">102</p>
                                </div>
                            </div>

                            <div class="help-form">
                                <h2>Contact Support</h2>
                                <form id="supportForm">
                                    <div class="form-group">
                                        <label for="subject">Subject</label>
                                        <input type="text" id="subject" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="message">Message</label>
                                        <textarea id="message" rows="4" required></textarea>
                                    </div>
                                    <button type="submit" class="submit-btn">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }
        
        contentArea.innerHTML = content;
        
        // Reinitialize SOS button if on home page
        if (page === 'home') {
            const sosButton = document.querySelector('.sos-button button');
            if (sosButton) {
                sosButton.addEventListener('click', () => {
                    sosActivated = !sosActivated;
                    sosButton.textContent = sosActivated ? 'ACTIVATED' : 'SOS';
                    sosButton.classList.toggle('activated');
                    
                    if (sosActivated) {
                        showNotification('Emergency services have been notified! Help is on the way.', 'error');
                        // Attempt to get user location
                        navigator.geolocation?.getCurrentPosition(
                            position => {
                                console.log('Location shared with emergency services');
                            },
                            error => {
                                console.log('Unable to share location');
                            }
                        );
                    }
                });
            }
        }
    }

    // Initial setup
    loginForm.addEventListener('submit', handleLogin);
});