import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "./Store";

function Login() {
    let username = useRef(null);
    let password = useRef(null);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    let LoginCheck = () => {
        if (username.current.value === "soumya" && password.current.value === "soumya@123") {
            dispatch(login(username.current.value));
            navigate("/home");
        } else {
            alert("Your credentials are incorrect. Please check and try again.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>Login Page</h2>

            <div style={{ marginBottom: "15px" }}>
                <label>User Name:</label>
                <br />
                <input type="text" ref={username} style={{ padding: "8px", width: "250px", marginTop: "5px" }} />
            </div>

            <div style={{ marginBottom: "15px" }}>
                <label>Password:</label>
                <br />
                <input type="password" ref={password} style={{ padding: "8px", width: "250px", marginTop: "5px" }} />
            </div>

            <button 
                style={{
                    backgroundColor: "gray",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "16px"
                }} 
                onClick={LoginCheck}
            >
                Login
            </button>
        </div>
    );
}

export default Login;
