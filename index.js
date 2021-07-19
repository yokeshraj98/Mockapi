function getUsers() {
    fetch("https://60c98aa8772a760017203b57.mockapi.io/users", {
            method: "GET"
        })
        .then((data) => {
            console.log(data);
            return data.json();
        })
        .then((users) => loadUsers(users));
}

function loadUsers(users) {
    const userList = document.createElement("div");
    userList.className = "user-list";
    users.forEach((user) => {
        const userContainer = document.createElement("div");
        userContainer.className = "user-container";

        userContainer.innerHTML = `
        <img class="user-image"  src=${user.avatar}> </img>
        <div>
          <h3 class="user-name">${user.name}</h3>
          <p class="user-time" >${new Date(user.createdAt).toDateString()}</p>
          <button onclick="deleteUser(${user.id})"> Delete </button>
          <button onclick="editUser( '${user.id}', '${user.name}', '${
          user.avatar
        }')"> Edit </button>
        </div>
        `;

        userList.append(userContainer);
    });

    document.body.append(userList);
}

// Edit User
function editUser(userId, userName, userAvatar) {
    console.log("Editing User....", userId, userName, userAvatar);
    document.querySelector(".submit-users").innerText = "Edit Users";
    document.querySelector(".new-user-name").value = userName;
    document.querySelector(".new-profile-pic").value = userAvatar;
    localStorage.setItem("userId", userId);
}
// new comment
// '<h3>' + user.name + '</h3>' + '\n' +

getUsers();

function addUser() {
    const type =
        document.querySelector(".submit-users").innerText === "Edit Users" ?
        "Edit" :
        "Add";

    const name = document.querySelector(".new-user-name").value;
    const avatar = document.querySelector(".new-profile-pic").value;
    const createdAt = new Date();
    const userDetails = {
        name: name,
        avatar: avatar,
        createdAt: createdAt
    };

    const method = type === "Add" ? "POST" : "PUT";
    const userId = type === "Add" ? "" : localStorage.getItem("userId");
    // Add User to the mockapi
    // 'https://60c98aa8772a760017203b57.mockapi.io/users/' + userId
    fetch(`https://60c98aa8772a760017203b57.mockapi.io/users/${userId}`, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userDetails)
    }).then((users) => refreshUsers());
}

function refreshUsers() {
    // userList
    document.querySelector(".user-list").remove();
    formReset();
    getUsers();
}

function formReset() {
    document.querySelector(".submit-users").innerText = "Add Users";
    document.querySelector(".new-user-name").value = "";
    document.querySelector(".new-profile-pic").value = "";
    localStorage.removeItem("userId");
}

// Add user -> remove existing list -> Get the new list (getUsers) -> load list Dom (loadUsers)
// document.querySelector

function deleteUser(id) {
    console.log("Deleting...", id);

    // fetch - delete -> refresh
    fetch(`https://60c98aa8772a760017203b57.mockapi.io/users/${id}`, {
            method: "DELETE"
        })
        .then((data) => {
            console.log(data);
            return data.json();
        })
        .then((users) => refreshUsers());
}