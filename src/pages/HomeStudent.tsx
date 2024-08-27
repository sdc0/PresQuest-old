import { useNavigate } from 'react-router-dom';
import { invoke } from '@tauri-apps/api';

import { classActive } from '../firebaseHelper';
import "../styles.css";

const HomeStudent = () => {
    const navigate = useNavigate();

    async function handleClick(event: any) {
        event.preventDefault();

        await invoke("set_class", { classString: event.target.code.value });
        await invoke("set_user", { userString: event.target.username.value });

        if (await classActive(event.target.code.value)) {
            console.log("Found class, routing now");
            navigate("/classStudent");
        }else console.log("Failed to find class");
    }

    function switchView() {
        navigate("/homeTeacher");
    }

    return (
    <div className="container">
        <div className="center-text wide">
            <h1 className="text-white center-text">Enter a Class Code and Name to Join</h1>
        </div>

        <form onSubmit={handleClick} className="form center-text wide">
            <input type="text" name="code" placeholder="Enter a class ID..." className="form-text bg-text"></input>
            <div className="form-break" />
            <input type="text" name="username" placeholder="Enter your name..." className="form-text bg-text"></input>
            <div className="form-break" />
            <button type="submit" className="submit-button bg-button">Submit</button>
        </form>

        <button onClick={switchView} className="switch-view-button bg-button">Switch to Teacher</button>
    </div>
    );
};
  
export default HomeStudent;