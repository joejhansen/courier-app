const submitCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#commentForm').value.trim();

    if (content) {
        try {
            const response = await fetch('comments', {
                method: 'POST',
                body: JSON.stringify({ content }),
                headers: { 'Content-Type': 'application/json' },
            })

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to submit comment');
            }
        } catch (error) {
            alert(`Something went wrong: ${error}`)
        }
    } else {
        alert('Please provide content in your comment');
    }
}

document.querySelector('#commentForm').addEventListener('submit', submitCommentHandler);