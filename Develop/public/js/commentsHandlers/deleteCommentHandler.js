const deleteCommentHandler = async (event) => {
    event.preventDefault();

    const id = document.querySelector('#commentDeleteBtn').attributes('id')

    try {
        const response = await fetch('/comments', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }
    } catch (error) {
        alert(`Something went wrong: ${error}`)
    }
}

document.querySelector('#commentDeleteBtn').addEventListener('click', deleteCommentHandler)