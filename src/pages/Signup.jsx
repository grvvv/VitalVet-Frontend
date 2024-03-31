import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import backgroundImage from "../images/img3.jpg";



const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async function(e) {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <div className="signup-page" style={{ backgroundImage: `url(${backgroundImage})`,margin: '0px', backgroundSize: 'cover', height: '100vh' }}>
            <form className="signup" onSubmit={handleSubmit}>
                <h2>Sign up</h2>

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

                <button disabled={isLoading}>Sign Up</button>
                { error && <div className="error">{error}</div>}
            </form>
        </div>
        
    )
}

export default Signup;