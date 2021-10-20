import axios from "axios";
// import { useAtom } from "jotai";
// import state from "../../../../stateManager";

const API_URL = process.env.REACT_APP_AUTH_URL;

class AuthService {
    login(username, password) {
        // const [_currentUser, setCurrentUser] = useAtom(state.currentUserAtom);
        return axios
            .post(API_URL + "/login", {
                username,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    // setCurrentUser(response.data);
                }

                return response.data;
            });
    }

    logout() {
        // const [_currentUser, setCurrentUser] = useAtom(state.currentUserAtom);
        localStorage.removeItem("user");
        // setCurrentUser(null);
    }

    register(username, email, password) {
        // const [_currentUser, setCurrentUser] = useAtom(state.currentUserAtom);

        return axios
            .post(API_URL + "/register", {
                username,
                email,
                password,
            })
            .then((response) => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    // setCurrentUser(response.data);
                }

                return response.data;
            });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
