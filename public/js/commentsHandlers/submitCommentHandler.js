const submitCommentHandler = async (event) => {
    event.preventDefault();

    const comment_text = document.querySelector('.textarea').value.trim();
    const post_id = document.querySelector('#postInfo').getAttribute('data-post-id')
    // const user_id = document.querySelector('#postInfo').getAttribute('data-user-id')
    const group_id = document.querySelector('#postInfo').getAttribute('data-group-id')

    // return console.log(comment_text, post_id, group_id)

    if (comment_text && post_id && group_id) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ post_id, group_id, comment_text }),
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

document.querySelector('#submitCommentBtn').addEventListener('click', submitCommentHandler);