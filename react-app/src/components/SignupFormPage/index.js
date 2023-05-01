import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSubmit, setHasSubmit] = useState(false);
  const [errors, setErrors] = useState({});
  const [backendErrors ,setBackendErrors] = useState([]);

  useEffect(() => {
    const err = {};
    if(username.length < 3) err["username"] = "Username must be at least 3 characters.";
    if(username.length > 20) err["username"] = "Username cannot exceed 20 characters.";
    if(!email.length) err["email"] = "Email is required.";
    if(email.length > 20) err["email"] = "Email cannot exceed 20 characters.";
    if(password.length < 4) err["password"] = "Password must be at least 4 characters.";
    if (password.length > 20) err["password"] = "Password cannot exceed 20 characters.";
    if (password !== confirmPassword) err["password"] = "Confirm Password field must be the same as the Password field";
    setErrors(err);
  }, [email, username, password, confirmPassword])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmit(true)
    if (password === confirmPassword && !Object.values(errors).length) {
        const data = await dispatch(signUp(username, email, password));
        if (data) {
          // console.log("DATA", data)
          setBackendErrors(data)
        }
    }
  };

  // console.log(errors)

  if (sessionUser) return <Redirect to="/videos" />;
  return (
    <>
      <div className="signup-form-container">
        <div className="signup-form-title">
          <div id="sign-up">Create an account</div>
          <div>to continue to FiTube</div>
        </div>
        {hasSubmit && backendErrors.length ? 
          (<ul>
            {
              backendErrors.map((err, idx) => (
                <li key={idx} className="errors">{err}</li>
              ))
            }

          </ul>)
          :
          null
        }
        {hasSubmit && Object.values(errors) && Object.values(errors).length ?
            (<ul>
              {
                Object.values(errors).map((err, idx) =>(
                  <li key={idx} className="errors">{err}</li>
                ))
              } 
    
            </ul>)
            :
            null
        }
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="signup-password">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

              <input
                id="signup-confirm"
                type="password"
                placeholder="Confirm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
          </div>

          <div className="signup-buttons">
            <NavLink to="/login">Sign in instead</NavLink>
            <button
              className="signup-submit"
              type="submit"
              disabled={hasSubmit && Object.values(errors).length}
            > Sign up
            </button>

          </div>
        </form>

        

      </div>
    </>
  );
}

export default SignupFormPage;
