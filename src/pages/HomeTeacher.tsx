import { invoke } from "@tauri-apps/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { classExists, activateClass, pushClass, getClass, getAuthState, logout } from "../firebaseHelper";
import "../styles.css";

const HomeTeacher = () => {
    const navigate = useNavigate();

    function switchView() {
        logout();
        navigate("/");
    }

    useEffect(() => {
        console.log(getAuthState());
        if (getAuthState() == null) navigate("/login");
    }, []);

    async function submit(event: any) {
        event.preventDefault();

        let class_key: string | null = null;

        if (event.target.active.checked) {
            if (await classExists(event.target.code.value, new Date(event.target.date.value))) {
                class_key = await getClass(event.target.code.value, new Date(event.target.date.value));
                if (class_key == null) { return };
                if (!await activateClass(class_key)) { return };
            }else { return };
        }else {
            if (!await classExists(event.target.code.value, new Date(event.target.date.value))) {
                class_key = await pushClass(event.target.code.value, new Date(event.target.date.value));
                console.log(class_key);
            }else { return };
        }
        
        if (class_key == null) { return };

        await invoke("set_class", { classString: class_key });

        navigate("/classTeacher");     
    }

    return (
    <div className="container">
        <div className="wide center-text">
            <h1 className="text-white">Welcome to PresQuest!</h1>
            <h1 className="text-white">Enter a Name and Date to Begin Class</h1>
        </div>

        <div className="center-text wide">
            <form onSubmit={submit} className="form">
                <input type="text" name="code" placeholder="Enter a class code..." className="form-text bg-text" />
                <div className="form-break" />

                <input type="datetime-local" name="date" className="form-text bg-text" />
                <div className="form-break" />

                <span className="text-white">Activate Existing Class?</span>
                <input type="checkbox" name="active" />
                <div className="form-break" />

                <button type="submit" className="submit-button bg-button">Start Class</button>
            </form>
            
            <div className="wide top-padding">
                <button onClick={switchView} className="switch-view-button bg-button">Switch to Student</button>
            </div>
        </div>
    </div>
    );
}

export default HomeTeacher;