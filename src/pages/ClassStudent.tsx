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
    }

    return (
    <div className="container center full-screen bg-dark-grey">
        <button onClick={async () => {
            await invoke("set_class", { classString: "" });
            await invoke("set_user", { userString: "" });
            navigate("/");
        }} className="bg-button leave-button">Leave</button>

        <div className="break" />

        <h1 className="text-white center-text wide smaller-gaps smallest-gaps">Welcome to Class</h1>

        <h1 className="text-white center-text wide smaller-gaps smallest-gaps">Enter a Message Below</h1>

        <form onSubmit={sendMessage} className="form wide smaller-gaps">
            <input type="text" name="message" placeholder="Enter a message..." className="bg-text form-text"></input>
            <div className="form-break" />
            <button type="submit" className="bg-button submit-button">Submit</button>
        </form>

        {success && <p className="text-green smaller-gaps">Message sent successfully</p>}
        {(success == false) && <p className="text-red smaller-gaps">Message failed to send, try again</p>}
        
    </div>
    );
};
  
export default ClassStudent;