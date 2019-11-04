document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    const form = document.querySelector('#addUserForm');
    form.addEventListener('submit', addUserFormSubmitted);
});
const loadUsers = async () => {
    const usersList = document.querySelector('#usersList');
    usersList.innerHTML = "";
    const response = await axios.get(`http://localhost:3030/users`)
    response.data.payload.forEach((user) => {
        let listItem = document.createElement("li");
        listItem.innerText = `${user.firstname} ${user.lastname}, age: ${user.age}`;
        usersList.appendChild(listItem);
    });
}
const addUserFormSubmitted = async (event) => {
    event.preventDefault();    
    const firstname = document.querySelector('#firstNameInput').value;
    const lastname = document.querySelector('#lastNameInput').value;
    const age = document.querySelector('#ageInput').value;
    let response = await axios.post(`http://localhost:3030/users/register`, {firstname, lastname, age});
    loadUsers();
}