const newpostFormHandler = async (event) => {
    event.preventDefault();

    const titleInput = document.querySelector('input[name="post-title"]').value;
    const contentInput = document.querySelector('textarea[name="post-content"]').value;

    try {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: titleInput,
                content: contentInput,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Something went wrong.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};

const newpostForm = document.querySelector('#newpost-form');
newpostForm.addEventListener('submit', newpostFormHandler);
