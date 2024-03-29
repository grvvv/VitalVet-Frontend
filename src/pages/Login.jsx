import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import backgroundImage from "../images/img3.jpg";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <div className="login-page" style={{ backgroundImage: `url(${backgroundImage})`,margin: '0px', backgroundSize: 'cover', height: '100vh' }}>
            <form className="login" onSubmit={handleSubmit}>
                <h2>Log in</h2>

                <label>Email:</label>
                <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />

                <label>Password:</label>
                <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />

                <button disabled={isLoading}>Log In</button>
                { error && <div className="error">{error}</div>}
            </form> 
        </div>
        
    )
}

export default Login;
