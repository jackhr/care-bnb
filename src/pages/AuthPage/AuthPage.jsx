import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import './AuthPage.css'

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <main id="login-main" style={{background: 'url(media/log-in.png) no-repeat'}}>
      <div>
        <div>
          <img src="media/logo.png" alt="Carebnb beatiful little logo" />
          <span id="title">Care <span>BnB</span></span>
        </div>
        <span id="blurb">Connecting parents<br />with trustworthy<br />caregivers</span>
      </div>
      <div id="login-div">
        {showLogin ? 
          <LoginForm showLogin={showLogin} setUser={setUser} />
          :
          <SignUpForm showLogin={showLogin} setUser={setUser} />
        }
        <div>
          { showLogin ? (
            <span>Want to join?
              &nbsp;<span className="change-form-btn" onClick={() => setShowLogin(!showLogin)}>Sign Up</span>
            </span>
          ) : (
            <span>Already a user?
              &nbsp;<span className="change-form-btn" onClick={() => setShowLogin(!showLogin)}>Log In</span>
            </span>
          )}
        </div>
      </div>
    </main>
  );
}