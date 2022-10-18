const deleteUserHandler = async (event) => {
    event.preventDefault();
    // do we want users to be able to see others profiles directly?
    // we could make the DELETE request be directly tied to the req.session.user_id and therefore harder to mess with?
    // TODO: if immutable/obfuscated, tie the req.session.user_id to the User.destroy request and only tie the .js/visibility of the button
    // -- to if the user_id and :id are the same.
    try {
        const response = await fetch('/api/users', {
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