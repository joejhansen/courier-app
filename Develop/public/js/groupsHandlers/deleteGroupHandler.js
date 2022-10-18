const deleteGroupHandler = async (event) => {
    event.preventDefulat();

    // const id = document.querySelector('#deleteBtn').attributes('id')
    // is this right?

    try {
        const response = await fetch('/groups', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
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

document.querySelector('#deleteBtn').addEventListener('click', deleteGroupHandler)