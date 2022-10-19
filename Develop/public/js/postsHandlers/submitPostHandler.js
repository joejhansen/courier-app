const submitPostHandler = async (event) => {
    event.preventDefault();

    const post_content = document.querySelector('#textArea').value.trim();
    const title = document.querySelector('#title').value.trim()
    const group_id = document.querySelector('#group_dropdown').value

    if (!post_content || !title || !group_id) {
        alert('Please provide content for both the title and main text!')
    } else {
        try {
            const response = await fetch('/api/posts', {
                method: 'POST',
                body: JSON.stringify({ title, post_content, group_id }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/')
            } else {
                alert('Failed to creat post. Please try again later.')
            }
        } catch (error) {
            alert(`Something went wrong! Error: ${error}`);
        }
    }
}

document.querySelector('#postForm').addEventListener('submit', submitPostHandler)