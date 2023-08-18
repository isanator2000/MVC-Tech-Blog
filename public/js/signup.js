const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameInput = document.querySelector('#username-signup');
  const passwordInput = document.querySelector('#password-signup');

  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  try {
      const response = await fetch('/api/user/signup', {
          method: 'POST',
          body: JSON.stringify({
              username,
              password,
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

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', signupFormHandler);

  