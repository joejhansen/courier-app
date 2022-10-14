const deletePostHandler = async (event) => {
    event.preventDefault();

    // const id = document.querySelector('#deletePostBtn')
    // need specific location of the ID in the dom before i can proceed

    try {
        const response = await fetch('/posts', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete post');
        }
    } catch (error) {
        alert(`Something went wrong: ${error}`)
    }

}

document.querySelector('#deletePostBtn').addEventListener('click', deletePostHandler)