import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./registration.css";

function Register() {
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    Axios.post("http://localhost:8080/expense_track/users/register", {
      user_id: 0,
      user_name: usernameReg,
      user_password: passwordReg
    }).then((response) => {
      console.log(response);
      if (response.data === "User already exists") alert(response.data);
      else alert("User registered succesfully");
    });
  };

  return (
    <div className="App">
      <h1>Registration</h1>
      <div className="registration">
        <p>Username:</p>
        <input
          type="text"
          name="username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <br />
        <p>Password:</p>
        <input
          type="text"
          name="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <br />
        <button onClick={register}>Register</button>
        <p>
          If already a user,click 
          <Link className="login-container" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export { Register };
