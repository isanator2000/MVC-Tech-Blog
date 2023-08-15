const delButton = document.querySelector('#del-post-btn');
const postIdInput = document.querySelector('input[name="post-id"]');
const postId = postIdInput.value;

const deleteHandler = async () => {
    try {
        const response = await fetch(`/api/post/${postId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
};

if (delButton !== null) {
    delButton.addEventListener('click', deleteHandler);
}
