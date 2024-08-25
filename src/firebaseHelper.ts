import { getDatabase, ref, push, update, get } from "firebase/database";
import { getAuth, User, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDoYINXeVVxqPaPOXM7TOWD3ezKFcUEcig",
    authDomain: "presquest.firebaseapp.com",
    databaseURL: "https://presquest-default-rtdb.firebaseio.com",
    projectId: "presquest",
    storageBucket: "presquest.appspot.com",
    messagingSenderId: "251706995074",
    appId: "1:251706995074:web:ba0632ce2d53ac9add9f9b",
    measurementId: "G-GKR9Y6SYZE"
};
  
let app = initializeApp(firebaseConfig);
let db = getDatabase(app);
let auth = getAuth(app);

export async function pushMessage(class_str: string, user_str: string, msg_str: string): Promise<boolean> {
    let r = ref(db, `${class_str}/questions`);
    return push(r, {
        user: user_str,
        message: msg_str,
        time: String(new Date(Date.now()))
    }).then(() => {
        return true;
    }).catch((error) => {
        console.log(`Failed to push: ${error}`);
        return false;
    });
}

export async function classActive(class_key: string): Promise<boolean> {
    return get(ref(db, class_key)).then((snapshot) => {
        if (!snapshot.exists()) return false;
        return snapshot.val()["active"];
    }).catch((error) => {
        console.log(`Failed to find class: ${error}`);
        return false;
    });
}

export async function classExists(class_str: string, date: Date): Promise<boolean> {
    return get(ref(db)).then((snapshot) => {
        let success = snapshot.forEach((child) => {
            const data = child.val();
            console.log(new Date(data.date).getTime());
            console.log(date.getTime());
            console.log(new Date(data.date).getTime() == date.getTime());
            if (new Date(data.date).getTime() == date.getTime() && data.name == class_str) return true;
        });

        if (success == true) return true;
        return false;
    }).catch((e) => {
        console.log("Failed to find class with error: ", e);
        return false;
    });

}

export async function getClass(class_str: string, date: Date): Promise<string | null> {
    return get(ref(db)).then((snapshot) => {
        let success: string | null = null;

        snapshot.forEach((child) => {
            const data = child.val();
            if (new Date(data.date).getTime() == date.getTime() && data.name == class_str) success = child.key;
        });

        return success;
    }).catch((e) => {
        console.log("Error finding class: ", e);
        return null;
    })
}

export async function activateClass(class_key: string): Promise<Boolean> {
    return update(ref(db, class_key), {
        active: true
    }).then(() => {
        return true;
    }).catch((e) => {
        console.log("Failed to activate class: ", e);
        return false;
    });
}

export async function endClass(class_key: string): Promise<Boolean> {
    return update(ref(db, class_key), {
        active: false
    }).then(() => {
        return true;
    }).catch((e) => {
        console.log("Failed to activate class: ", e);
        return false;
    });
}

export async function pushClass(class_str: string, date: Date): Promise<string | null> {
    console.log(class_str, " ", date);
    return push(ref(db), {
        name: class_str,
        date: String(date),
        active: true
    }).key;
}

export async function getMessages(class_key: string): Promise<[]> {
    return get(ref(db, `${class_key}/questions`)).then((snapshot) => {
        return snapshot.val();
    }).catch((e) => {
        console.log("Error while fetching messages: ", e);
        return [];
    });
}

export function getAuthState(): (User | null) {
    return auth.currentUser;
}

export async function login(email: string, password: string): Promise<Boolean> {
    return signInWithEmailAndPassword(auth, email, password).then((user) => {
        console.log("got user");
        return true;
    }).catch((error) => {
        console.log("Failed to log in user with error: ", error);
        return false;
    });
}

export function logout(): void {
    auth.signOut();
}