import React from 'react';
import supabase from '../../supabase/client';
import { Toaster, toast } from 'sonner'
import { Link, useNavigate } from 'react-router';
import signin from '../../css/signin.module.css';

function LoginForm() {
  const navigate = useNavigate();


  const handleSignIn = async (event) => {
    event.preventDefault();
    const formLogin = event.currentTarget;
    const { email, password } = Object.fromEntries(new FormData(formLogin));

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,

      });

      if (error) {
        toast.error('Login failed. Please try again.');
      } else {
        toast.success('Login successful.');
        await new Promise((resolve) => setTimeout(resolve, 1000));
        formLogin.reset();
        navigate('/');
      }
    } catch (error) {
      alert(error.message);
    }

  };

  return (
    <div className={signin.loginContainer}>
      <div className={signin.formContainer}>
        <div className={signin.formSection}>
          <h1 className={signin.title}>Log in</h1>
          <form onSubmit={handleSignIn} >
            <div className={signin.formGroup}>
              <input
                type="email"
                name="email"
                className={signin.authInput}
                placeholder="Email"
                required
              />
            </div>
            <div className={signin.formGroup}>
              <input
                type="password"
                name="password"
                className={signin.authInput}
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" onClick={() => toast.success('Event has been created')} className={signin.authButton}>Log in</button>

            <Toaster theme='dark' richColors position="top-center" />

            <div className={signin.authLinks}>
              <Link to="/register">Don't have an account? Sign up</Link>
            </div>
          </form>
        </div>

        <div className={signin.socialSection}>
          <p className={signin.socialText}>You can use social accounts to log in</p>
          <a href="https://github.com/login" target="_blank" className={signin.gitButton}>
            Continue with GitHub <i className="bi bi-github"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;