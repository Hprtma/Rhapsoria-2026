// Adjust AOS settings for scroll snapping
AOS.init({
    once: false, // Allow re-animating when scrolling back up
    offset: 0,
    duration: 800,
    easing: 'ease-out-cubic',
});

// Login Logic
const loginForm = document.getElementById('loginForm');
const loginOverlay = document.getElementById('loginOverlay');
const errorMessage = document.getElementById('errorMessage');

// Prevent scrolling while login overlay is active
if (loginOverlay) {
    if (sessionStorage.getItem('panitiaLoggedIn') === 'true') {
        loginOverlay.style.display = 'none';
        document.documentElement.style.overflow = '';
    } else {
        document.documentElement.style.overflow = 'hidden';

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const user = document.getElementById('username').value;
            const pass = document.getElementById('password').value;

            // Default credentials: panitia / rhapsoria2026
            if (user === 'panitia' && pass === '123') {
                sessionStorage.setItem('panitiaLoggedIn', 'true');
                loginOverlay.style.opacity = '0';
                setTimeout(() => {
                    loginOverlay.style.display = 'none';
                    document.documentElement.style.overflow = '';
                    AOS.refresh(); // Refresh AOS so animations trigger correctly
                }, 500);
            } else {
                errorMessage.classList.remove('hidden');
                // Shake effect fallback
                loginForm.classList.add('animate-pulse');
                setTimeout(() => loginForm.classList.remove('animate-pulse'), 500);
            }
        });
        // Toggle Password Visibility
        const togglePassword = document.getElementById('togglePassword');
        const passwordInput = document.getElementById('password');
        const iconEye = document.getElementById('icon-eye');
        const iconEyeOff = document.getElementById('icon-eye-off');

        if (togglePassword && passwordInput) {
            togglePassword.addEventListener('click', function () {
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    iconEye.classList.add('hidden');
                    iconEyeOff.classList.remove('hidden');
                } else {
                    passwordInput.type = 'password';
                    iconEye.classList.remove('hidden');
                    iconEyeOff.classList.add('hidden');
                }
            });
        }
    }
}
