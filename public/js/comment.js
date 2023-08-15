const postIdInput = document.querySelector('input[name="post-id"]');
const postId = postIdInput.value;

const commentFormHandler = async (event) => {
    event.preventDefault();
    const commentInput = document.querySelector('textarea[name="comment-body"]');
    const comment = commentInput.value.trim();
    console.log(comment);

    if (comment) {
        try {
            const response = await fetch('/api/comment', {
                method: 'POST',
                body: JSON.stringify({
                    comment: comment,
                    postId: postId,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                document.location.reload();
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }
};

const commentForm = document.querySelector('.comment-form');
if (commentForm !== null) {
    commentForm.addEventListener('submit', commentFormHandler);
}
