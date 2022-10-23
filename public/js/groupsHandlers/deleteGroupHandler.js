const deleteGroupHandler = async (event) => {
    event.preventDefault();

    const group_id = window.location.pathname.trim('').split('/')[3]

    // return console.log(group_id)

    try {
        const response = await fetch(`/api/groups/${group_id}`, {
            method: 'DELETE',
            body: JSON.stringify({ group_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        console.log(response)
        if (response.ok) {
            document.location.replace('/')
        } else {
            alert('Failed to delete group. Please try again later.');
        }

    } catch (err) {
        alert(`Something went wrong: ${error}`)
    }

}

document.querySelector('#deleteGroupForm').addEventListener('submit', deleteGroupHandler)