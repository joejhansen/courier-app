const createGroupHandler = async (event) => {
    event.preventDefault();

    const group_name = document.querySelector('#groupName').value.trim()

    if (group_name) {
            const response = await fetch('/api/groups', {
                method: 'POST',
                body: JSON.stringify({ group_name }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
              } else {
                alert('Failed to create a post');
              }
            }
          };

document.querySelector('#groupForm').addEventListener('submit', createGroupHandler)