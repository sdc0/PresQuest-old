import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAuthState } from "./firebaseHelper";
import HomeStudent from "./pages/HomeStudent";
import ClassStudent from "./pages/ClassStudent";
import HomeTeacher from "./pages/HomeTeacher";
import ClassTeacher from "./pages/ClassTeacher";
import Login from "./pages/TeacherLogin";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(getAuthState() != null);
    }, [loggedIn]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomeStudent />} />
                <Route path="/classStudent" element={<ClassStudent />} />
                <Route path="/homeTeacher" element={<HomeTeacher />} />
                <Route path="/classTeacher" element={<ClassTeacher />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
