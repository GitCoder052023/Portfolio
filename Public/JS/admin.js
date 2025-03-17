const currentHost = window.location.hostname;
const API_BASE_URL = `http://${currentHost}:5000`;
const loginForm = document.getElementById('loginForm');
const imageUploadForm = document.getElementById('imageUploadForm');
const loginSection = document.getElementById('loginSection');
const adminPanel = document.getElementById('adminPanel');
const logoutBtn = document.getElementById('logoutBtn');
const formLoader = document.getElementById('formLoader');
const imageInput = document.getElementById('imageInput');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const currentProfileImage = document.getElementById('currentProfileImage');
const sidebar = document.getElementById('sidebar');
const openSidebarBtn = document.getElementById('openSidebarBtn');
const closeSidebarBtn = document.getElementById('closeSidebarBtn');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');

function checkAuthStatus() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        showAdminPanel();
    }
}

function showAdminPanel() {
    loginSection.classList.add('hidden');
    adminPanel.classList.remove('hidden');
}

function hideAdminPanel() {
    adminPanel.classList.add('hidden');
    loginSection.classList.remove('hidden');
}

function openSidebar() {
    sidebar.classList.remove('closed');
    sidebar.classList.add('open');
    sidebarOverlay.classList.remove('hidden');
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebar.classList.add('closed');
    sidebarOverlay.classList.add('hidden');
}

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formLoader.classList.remove('hidden');

    const formData = new FormData(loginForm);
    const credentials = {
        username: formData.get('username'),
        password: formData.get('password')
    };

    try {
        console.log('Sending login request...');
        const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include'
        });

        console.log('Response status:', response.status);
        const data = await response.json();

        if (response.ok) {
            console.log('Login successful');
            localStorage.setItem('adminToken', data.token);
            showAdminPanel();
        } else {
            console.log('Login failed:', data.message);
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    } finally {
        formLoader.classList.add('hidden');
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('adminToken');
    hideAdminPanel();
    loginForm.reset();
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreviewContainer.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    }
});

imageUploadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formLoader.classList.remove('hidden');

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);

    try {
        const response = await fetch(`${API_BASE_URL}/api/admin/update-profile-image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            alert('Profile image updated successfully');
            currentProfileImage.src = `/api/profile-image?t=${Date.now()}`;
            imageUploadForm.reset();
            imagePreviewContainer.classList.add('hidden');
        } else {
            throw new Error(data.message || 'Failed to update profile image');
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert(error.message || 'Failed to update profile image');
    } finally {
        formLoader.classList.add('hidden');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('adminToken')) {
        hideAdminPanel();
    }

    const profileImage = document.getElementById('currentProfileImage');
    
    profileImage.src = `${API_BASE_URL}/api/profile-image`;
    
    profileImage.onerror = () => {
        console.error('Failed to load profile image');
    };

    if (openSidebarBtn) {
        openSidebarBtn.addEventListener('click', openSidebar);
    }
    
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }
    
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', function() {
            localStorage.removeItem('adminToken');
            location.reload();
        });
    }
    
    const menuItems = document.querySelectorAll('#sidebar nav a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth < 768) {
                closeSidebar();
            }
        });
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768) {
            sidebarOverlay.classList.add('hidden');
        }
    });
    
    checkAuthStatus();
});