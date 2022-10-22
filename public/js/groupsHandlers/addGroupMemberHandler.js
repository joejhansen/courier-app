const addGroupMemberHandler = (event) => {
    event.preventDefault();
    console.log("hello")
    const newUser = document.querySelector('#newMemberField').value.trim('')

    console.log(newUser)
}

document.querySelector('#addMemberForm').addEventListener('submit', addGroupMemberHandler)