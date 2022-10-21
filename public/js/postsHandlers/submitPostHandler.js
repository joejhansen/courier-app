const userGroupHandler = (event) => {
    event.preventDefault()
    document.querySelector('#groupIDValue').textContent = parseInt(event.target.textContent.trim(''))
}

const submitPostHandler = async (event) => {
    event.preventDefault();

    const post_content = document.querySelector('#textArea').value.trim();
    const title = document.querySelector('#title').value.trim()
    const group_id = parseInt(document.querySelector('#groupIDValue').textContent)

    // console.log(post_content, title, group_id)

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
                alert('Failed to create post. Please try again later.')
            }
        } catch (error) {
            alert(`Something went wrong! Error: ${error}`);
        }
    }
}

document.querySelector('.new-post-form').addEventListener('submit', submitPostHandler)
document.querySelector('.user-groups').addEventListener('click', userGroupHandler)