const addGroupMemberHandler = async (event) => {
    event.preventDefault();

    const group_id = window.location.pathname.trim('').split('/')[3]
    const newUser = document.querySelector('#newMemberField').value.trim('')

    if (!group_id || !newUser){
        return alert('please provide a valid username')
    }

    try{
        const response = fetch(`/api/groups/${group_id}`, {
            method: 'PUT',
            body: JSON.stringify({ newUser, }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.replace(`/api/groups/${group_id}`)
        } else {
            alert('Failed to add new user')
        }

    }catch(error){
        console.log(error)
    }
}

document.querySelector('#addMemberForm').addEventListener('submit', addGroupMemberHandler)