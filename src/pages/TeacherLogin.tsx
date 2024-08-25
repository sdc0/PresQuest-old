import { useNavigate } from "react-router-dom";

import { login, logout } from "../firebaseHelper";

const Login = () => {
    const navigate = useNavigate();

    async function leave() {
        logout();
        navigate("/");
    }

    async function submit(event: any) {
        event.preventDefault();
        console.log(event.target.email.value, ", ", event.target.password.value)
        if (!await login(event.target.email.value, event.target.password.value)) return;

        navigate("/homeTeacher");
    }

    return (
    <div className="container center">
        <button onClick={leave} className="leave-button bg-button">Go Back</button>

        <div className="top-padding center-text">
            <h1 className="text-white">Enter your Login Information</h1>

            <form className="form" onSubmit={submit}>
                <input type="email" name="email" className="form-text bg-text" placeholder="Enter your email..." />
                <div className="form-break" />
                <input type="password" name="password" className="form-text bg-text" placeholder="Enter your password..." />
                <div className="form-break" />
                <button type="submit" className="bg-button submit-button">Submit</button>
            </form>
        </div>
    </div>
    );
}

export default Login;