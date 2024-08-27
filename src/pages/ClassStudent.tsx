import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { invoke } from "@tauri-apps/api";

import { pushMessage } from "../firebaseHelper";
import "../styles.css";

const ClassStudent = () => {
    const navigate = useNavigate();
    const [success, setSuccess]: any = useState(null);

    async function sendMessage(event: any) {
        event.preventDefault();
        setSuccess(await pushMessage(
            await invoke("get_class"),
            await invoke("get_user"),
            event.target.message.value
        ));
        setTimeout(() => {
            setSuccess(null);
        }, 2000)
    }

    return (
    <div className="container">
        <button onClick={async () => {
            await invoke("set_class", { classString: "" });
            await invoke("set_user", { userString: "" });
            navigate("/");
        }} className="bg-button leave-button">Leave</button>

        <div className="center-text wide top-padding">
            <h1 className="text-white">Welcome to Class</h1>
            <h1 className="text-white">Enter a Message Below</h1>
        </div>

        <form onSubmit={sendMessage} className="form wide">
            <input type="text" name="message" placeholder="Enter a message..." className="bg-text form-text"></input>
            <div className="form-break" />
            <button type="submit" className="bg-button submit-button">Submit</button>
        </form>

        <div className="center-text wide top-padding">
            {success && <p className="text-green smaller-gaps">Message sent successfully</p>}
            {(success == false) && <p className="text-red smaller-gaps">Message failed to send, try again</p>}
        </div>
    </div>
    );
};
  
export default ClassStudent;