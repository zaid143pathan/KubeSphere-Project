async function loadUsers() {

    try {

        const response = await fetch('http://49.50.92.86:30090/api/users');

        const users = await response.json();

        const userList = document.getElementById('users');

        userList.innerHTML = '';

        users.forEach(user => {

            const li = document.createElement('li');

            li.textContent = user.name;

            userList.appendChild(li);
        });

    } catch (error) {

        console.log('Error:', error);
    }
}

async function addUser() {

    const username = document.getElementById('username').value;

    await fetch('http://49.50.92.86:30090/api/users', {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            name: username
        })
    });

    loadUsers();
}

window.onload = loadUsers;
