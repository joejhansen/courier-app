const changeOptionHandler = (event) => {
    var e = document.getElementById("groupDropDown");

    const onChange = () => {
        const value = e.value;
        var text = e.options[e.selectedIndex].text;
        return { value, text }
    }

    e.addEventListener('change', onChange)
    // e.onchange = onChange;
    const currentValues = onChange();
    e.setAttribute('data-group-id', currentValues.value)
    return
}

const submitPostHandler = async (event) => {
    event.preventDefault();
    // return console.log(document.querySelector("#textArea").innerHTML)
    const post_content = document.querySelector("#textArea").innerHTML;
    const title = document.querySelector('#title').value.trim()
    const group_id = document.querySelector('#groupDropDown').getAttribute('data-group-id')

    // const group_id = 

    // return console.log(post_content, title, group_id)

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
// document.querySelector('#groupDropDown').addEventListener('change', changeOptionHandler)
document.getElementById('groupDropDown').addEventListener('change', changeOptionHandler)