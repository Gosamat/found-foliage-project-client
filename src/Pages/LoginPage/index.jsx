import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/Auth.Context"

const API_URL = "https://found-foliage-server.onrender.com";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {storeToken, authenticateUser} = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {
      email,
      password
    };
    axios.post(`${API_URL}/auth/login`, requestBody)
    .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
        window.location.reload(); 
      }).catch((error) => {
        const errorDescription =  error.response.data.message
        setErrorMessage(errorDescription);
      })

  };

  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <label>
                email: <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                password: <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <p>Do not have an account yet?</p>
        <Link to="/signup">Sign up</Link>
    </div>
  )
}
export default LoginPage;
