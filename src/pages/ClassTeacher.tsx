import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api";

import { getMessages, endClass } from "../firebaseHelper"
import "../styles.css";


const ClassTeacher = () => {
    const [messages, setMessages] = useState([]);
    const [key, setKey] = useState("");
    const navigate = useNavigate();

    async function leave() {
        await invoke("set_class", { classString: "" });
        if (!await endClass(key)) { return };

        navigate("/homeTeacher");
    }

    useEffect(() => {
        invoke("get_class").then((class_key) => {
            setKey(String(class_key));

            getMessages(String(class_key)).then((msgs) => {
                let q: [] = [];

                for (let k in msgs) {
                    q.unshift(msgs[k]["message"]);
                }

                setMessages(q);
            });
        });
    }, [messages, key]);

    return (
    <div className="container">
        <button onClick={leave} className="leave-button bg-button">Leave</button>

        <div className="top-padding">
            <div className="wide center-text">
                <h1 className="text-white">Welcome to Class</h1>
                <h1 className="text-white">Use {key} to Join</h1>
            </div>
            <ul className="chat-log">
                {
                    messages.map((msg) => {
                        return <li className="text-white">{msg}</li>
                    })
                }
            </ul>
        </div>
    </div>
    );
}

export default ClassTeacher;