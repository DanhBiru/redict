document.addEventListener("DOMContentLoaded", () => {
    const f = document.getElementById("loginForm");
    if (!f) return;
    f.addEventListener("submit", e => {
        e.preventDefault();
        const u = document.getElementById("username").value.trim();
        const p = document.getElementById("password").value.trim();

        // updateResultItems(v);
        loginHandling(u, p);
    });
});

async function loginHandling(username, password) {
    if(!await checkIfExistOrCorrectPassword(username, password)) {
        return;
    }

    window.location.href = "index.html";
}

async function checkIfExistOrCorrectPassword(username, password) {
    const url = "http://localhost:8080/api/users/" + username;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const user = await response.json();
        if (user.password === password) {
            alert("Đúng mật khẩu r");
            return true;
        }
        
        alert("Sai mật khẩu r")
        return false;
    } catch (error) {
        console.error(error.message);
        alert("Tài khoản không tồn tại :)")
        return false;
    }
}
