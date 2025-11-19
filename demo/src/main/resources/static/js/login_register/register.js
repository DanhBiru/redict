document.addEventListener("DOMContentLoaded", () => {
    const f = document.getElementById("registerForm");
    if (!f) return;
    f.addEventListener("submit", e => {
        e.preventDefault();
        const u = document.getElementById("username").value.trim();
        const n = document.getElementById("name").value.trim();
        const p = document.getElementById("password").value.trim();
        // if (v) document.getElementById("resultsSection").style.display = "block";

        // updateResultItems(v);
        // checkIfExist(u);
        registerHandling(n, u, p);
    });
});

async function registerHandling(name, username, password) {
    if(await checkIfExist(username)) return;
    addUser(name, username, password);
}

async function checkIfExist(username) {
    const url = "http://localhost:8080/api/users/" + username;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const user = await response.json();
        // console.log(user);
        alert("Username tồn tại r:)")
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
    
}

async function addUser(name, username, password) {
    const url = "http://localhost:8080/api/users";
    const userData = {
        name: name,
        username: username,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const newUser = await response.json();
        console.log("User created:", newUser);
        alert("OK tạo tk r")
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
    }
}