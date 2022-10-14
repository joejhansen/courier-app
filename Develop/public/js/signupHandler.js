const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username').value.trim();
    const password = document.querySelector('#password').value.trim();

    if (!username || !password) {
        alert('Please provide a valid username and password');
    } else {
        try {
            const response = await fetch('/users/signup', {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/');
            } else {
                alert('Failed to create user');
            }
        } catch (error) {
            alert(`Something went wrong: ${error}`)
        }
    }
}

document.querySelector('#signupForm').addEventListener('submit', signupHandler);