import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handlesubmit = (e)=>{
    e.preventDefault();
    const requestBody = {username, email, password};
    axios.post(`${API_URL}/auth/signup`, requestBody)
    .then(() => {
        navigate("/auth/login");
      })
    .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handlesubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </label>

        <label>
          username:
          <input
            type="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </label>
        <button>Sign up</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}
export default SignupPage;
