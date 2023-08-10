import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, NavLink, Redirect } from "react-router-dom";
import './LoginForm.css';

function LoginFormPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to={history.location.state ?
                                      history.location.state.goBackURL
                                      :
                                      "/videos"}/>;


  const demoHandler = async (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(["Invalid credentials"]);
    }
  };

  return (
    <>
      <div className="login-form-container">
        <div className="login-form-title">
          <div id="sign-in">Sign in</div>
          <div>to continue to FiTube</div>
        </div>
        

        <form className="login-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx} className="errors">{error}</li>
            ))}
          </ul>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          
        </form>

        <div className="login-demo">
          Don't have an account? Log in as a
          <button
            onClick={demoHandler}
          >
            Demo User
          </button>
        </div>
        
        <div className="login-buttons">
          <NavLink to="/signup">Create an account</NavLink>
          <button 
            className="login-submit" 
            type="submit" 
            onClick={handleSubmit}
          >Log In
          </button>
        </div>

        
      </div>
    </>
  );
}

export default LoginFormPage;
