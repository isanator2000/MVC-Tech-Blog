const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const usernameInput = document.querySelector("#username-login");
    const passwordInput = document.querySelector("#password-login");
  
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
          username: usernameInput.value,
          password: passwordInput.value,
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
  
  const loginForm = document.querySelector('#login-form');
  loginForm.addEventListener('submit', loginFormHandler);
  