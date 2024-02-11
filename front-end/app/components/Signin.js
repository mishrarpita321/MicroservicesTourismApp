import { useState } from 'react';
import './app1.css';

const Signin = () => {
  const [captchaValue, setCaptchaValue] = useState('');

  const handleRecaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  // Function to handle Google login
  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log('Perform Google login');
  };

  // Function to handle Facebook login
  const handleFacebookLogin = () => {
    // Implement Facebook login logic here
    console.log('Perform Facebook login');
  };

  return (
    <div className="container">
      <h1>Welcome</h1>
      <h2>Sign In</h2>
      <form action="#">
        <label htmlFor="email">Email Address</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />

        <button type="submit">Sign in</button>

        {/* Google Login Button */}
        <button type="button" onClick={handleGoogleLogin} className="oauth-button google-button">
          Sign in with Google
        </button>

        {/* Facebook Login Button */}
        <button type="button" onClick={handleFacebookLogin} className="oauth-button facebook-button">
          Sign in with Facebook
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

