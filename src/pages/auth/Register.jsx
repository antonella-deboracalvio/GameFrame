import React from 'react';
import { Link, useNavigate } from 'react-router';
import supabase from '../../supabase/client';
import { Toaster, toast } from 'sonner'
import signup from '../../css/signup.module.css';


function RegisterForm() {
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    const formRegister = event.currentTarget;
    const { email, password, username, first_name, last_name } =
      Object.fromEntries(new FormData(formRegister));

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
            first_name,
            last_name
          },
        },
      });

      if (error) {
        toast.error('Registration failed. Please try again.');
      } else {
        toast.success('Registration successful.');
        await new Promise((resolve) => setTimeout(resolve, 2000));
        formRegister.reset();
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }

  };

  return (
    <div className={signup.registerContainer}>
      <div className={signup.registerForm}>
        <h1>Sign up</h1>
        <form onSubmit={handleSignUp}>
          <div className={signup.formGroup}>
            <input
              type="text"
              id='username'
              name="username"
              className={signup.authInput}
              placeholder="Username"
              required
            />
          </div>
          <div className={signup.formGroup}>
            <input
              type="text"
              id='first_name'
              name="first_name"
              className={signup.authInput}
              placeholder="Name"
              required
            />
          </div>
          <div className={signup.formGroup}>
            <input
              type="text"
              id='last_name'
              name="last_name"
              className={signup.authInput}
              placeholder="Surname"
              required
            />
          </div>
          <div className={signup.formGroup}>
            <input
              type="email"
              id='email'
              name="email"
              className={signup.authInput}
              placeholder="Email"
              required
            />
          </div>
          <div className={signup.formGroup}>
            <input
              type="password"
              id='password'
              name="password"
              className={signup.authInput}
              placeholder="Create a password"
              required
            />
          </div>
          <button type="submit" onClick={() => toast.success('Event has been created')} className={signup.authButton}>
            Sign up
          </button>
          <Toaster theme='dark' richColors />
          <div className={signup.authLinks}>
            <Link to="/login">Already have an account? <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Log in</span></Link>
          </div>
          <div>
            <a href="https://github.com/login" target="_blank" className={signup.gitButton}>
              Continue with GitHub <i className="bi bi-github"></i>
            </a>
          </div>
          <div className={signup.terms}>
            <span style={{ fontWeight: 'bold' , fontSize: '1rem'}}>  GameFrame's  </span> <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;

