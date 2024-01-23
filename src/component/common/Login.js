import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Navbar from './Navbar';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const navigate = useNavigate();

  const adminUsername = 'admin@gmail.com';
  const adminPassword = 'admin';

  const handleRecaptchaChange = (value) => {
    setIsCaptchaVerified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!isCaptchaVerified) {
        toast.error('Please complete the reCAPTCHA challenge');
        return;
      }

      if (username === adminUsername && password === adminPassword) {
        toast.success('Login successful!');
        navigate('/home1');
      } else {
        const response = await axios.post('http://localhost:5211/api/auth/login', {
          email: username,
          password,
        });

        if (response.status === 200) {
          toast.success('Login successful!');
          sessionStorage.setItem('loggedInUser', JSON.stringify({ username }));
          navigate('/home2');
        } else {
          toast.error('Invalid credentials');
        }
      }
    } catch (error) {
      toast.error('Login Failed!');
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="container pt-5">
        <div className="card shadow border">
          <div className="card-header bg-success bg-gradient ml-0 py-4">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="py-2 text-white">Login</h2>
              </div>
            </div>
          </div>
        </div>
        <br />
        <section>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                value={username}
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="email" className="form-label">
                Username/Email
              </label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                value={password}
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="form-label">
                Password
              </label>
            </div>
            <div className="login__field mb-3">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Replace with your actual reCAPTCHA site key
                onChange={handleRecaptchaChange}
              />
            </div>
            <button
              type="submit"
              disabled={!isCaptchaVerified}
              className="w-100 btn btn-lg btn btn-success"
            >
              Login
            </button>
            <div className="d-flex justify-content-between pt-2">
              <p>
                <a href="/Register">Register as a new user</a>
              </p>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
