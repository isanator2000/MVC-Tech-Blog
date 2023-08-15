const logoutHandler = async () => {
    try {
        const response = await fetch('/api/user/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
            alert('You have logged out.');
        } else {
            alert('Failed to log out.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};

const logoutButton = document.querySelector('#logout');
logoutButton.addEventListener('click', logoutHandler);
