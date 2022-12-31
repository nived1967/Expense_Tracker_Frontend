import { useState} from "react";
import Axios from 'axios';
import {useNavigate} from 'react-router-dom';

function Login() {
    const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () =>{
    Axios.post("http://localhost:8080/expense_track/users/login",{
      user_id:0,
      user_name:username,
      user_password:password,
    }).then((response)=>{
      console.log(response.data[0].user_id);
      if(response.data.length===0)
      alert("Wrong username/password combination");
      else
      {
        localStorage.setItem("user_id",response.data[0].user_id);
        navigate('/nav/home');
      }
    })
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <div className="login">
        <p>Username:</p>
        <input
        type="text"
        name="username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
        <p>Password:</p>
        <input
          type="text"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export {Login};
