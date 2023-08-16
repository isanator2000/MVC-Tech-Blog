const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

const editHandler = async (event) => {
  event.preventDefault();
  const titleInput = document.querySelector('input[name="post-title"]').value;
  const contentInput = document.querySelector('textarea[name="post-content"]').value;

  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        postId,
        title: titleInput,
        content: contentInput,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert('Something went wrong.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
};

const editForm = document.querySelector('.edit-form');
editForm.addEventListener('submit', editHandler);
