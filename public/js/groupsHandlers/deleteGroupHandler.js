const deleteGroupHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#deleteBtn').attributes('data-group-id')
    const group_admin = document.querySelector('#deleteBtn').attributes('data-group-admin')
    // const id = document.querySelector('#deleteBtn').attributes('id')
    // is this right?

    if (!id || !group_admin) {
        alert("Failed to delete group.")
    } else {

        try {
            const response = await fetch('/groups', {
                method: 'DELETE',
                body: JSON.stringify({ id, group_admin }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/')
            } else {
                alert('Failed to delete group. Please try again later.');
            }

        } catch (err) {
            alert(`Something went wrong: ${error}`)
        }
    }
}

document.querySelector('#deleteBtn').addEventListener('click', deleteGroupHandler)