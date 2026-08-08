const registerBtn = document.getElementById('registerBtn');

if (registerBtn) {
    registerBtn.addEventListener('click', function() {
        const email = document.getElementById('registerEmail').value.trim();
        const password = document.getElementById('registerPassword').value.trim();

        if (!email || !password) {
            alert('Email dan Password harus diisi!');
            return;
        }
        if (!email.includes('@')) {
            alert('Masukkan email yang valid!');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userExists = users.some(user => user.email === email);

        if (userExists) {
            alert('Email sudah terdaftar! Gunakan email lain.');
            return;
        }
        const newUser = {
            email: email,
            password: password
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Pendaftaran berhasil! Silakan login.');
        window.location.href = 'login.html';
    });
}

const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', function() {
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();

        if (!email || !password) {
            alert('Email dan Password harus diisi!');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user => 
            user.email === email && user.password === password
        );

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify({
                email: foundUser.email
            }));
            
            alert('Login berhasil! Selamat datang, ' + email + '!');
            window.location.href = 'index.html';
        } else {
            alert('Email atau Password salah!');
        }
    });
}

const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin keluar?')) {
            localStorage.removeItem('currentUser');
            alert('Anda telah keluar!');
            window.location.href = 'login.html';
        }
    });
}

function checkSession() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!currentUser && currentPage !== 'login.html' && currentPage !== 'register.html' && currentPage !== '') {
        alert('Silakan login terlebih dahulu!');
        window.location.href = 'login.html';
    }
    
    if (currentUser && (currentPage === 'login.html' || currentPage === 'register.html')) {
        window.location.href = 'index.html';
    }
}