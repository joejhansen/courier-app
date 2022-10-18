const submitPostHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#textArea').value.trim();
    const title = document.querySelector('#title').value.trim()

    if (!content || !title) {
        alert('Please provide content for both the title and main text!')
    } else {
        try {
            const response = await fetch('/posts', {
                method: 'POST',
                body: JSON.stringify({ content, title }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log(`New post submited`)
            } else {
                alert('Failed to creat post. Please try again later.')
            }
        } catch (error) {
            alert(`Something went wrong! Error: ${error}`);
        }
    }
}

document.querySelector('#postForm').addEventListener('submit', submitPostHandler)