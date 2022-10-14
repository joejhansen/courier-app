const createGroupHandler = async (event) => {
    event.preventDefulat();

    const name = document.querySelector('#groupName').value.trim()

    if (name) {

        try {
            const response = await fetch('/groups', {
                method: 'POST',
                body: JSON.stringify({ name }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                console.log('Group created')
            } else {
                alert('Failed to create group. Please try again later.');
            }

        } catch (err) {
            alert('Something went wrong. Please try again later')
        }

    } else {
        alert('Please provide a name for the group')
    }
}

document.querySelector('#groupForm').addEventListener('submit', createGroupHandler)