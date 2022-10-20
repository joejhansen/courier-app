const submitCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('#commentForm').value.trim();
    const post_id = document.querySelector('#postInfo').attributes('data-post-id')
    const user_id = document.querySelector('#postInfo').attributes('data-user-id')
    const group_id = document.querySelector('#postInfo').attributes('data-group-id')
    

    if (comment_text && post_id && user_id) {
        try {
            const response = await fetch('comments', {
                method: 'POST',
                body: JSON.stringify({ user_id, post_id, group_id, comment_text }),
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