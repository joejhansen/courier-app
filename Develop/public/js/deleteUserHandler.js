const deleteUserHandler = async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('/users', {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete user');
        }
    } catch (error) {
        alert(`Something went wrong: ${error}`)
    }
}

document.querySelector('#deleteUserBtn').addEventListener('click', deleteUserHandler)