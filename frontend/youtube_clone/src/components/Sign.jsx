import { useEffect, useState } from "react";
import "../Css/navbar.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Reset from "./Reset";

function Signin(prop) {
  const backendURL = "https://youtube-clone-mern-backend.vercel.app"
  // const backendURL = "http://localhost:3000"
  const [data, setData] = useState({});
  const [showReset, setShowReset] = useState(false);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });

  useEffect(() => {
    if (prop.close === true) {
      setShowReset(false);
    }
  }, [prop.close]);

  useEffect(() => {
    if (prop.switch === false) {
      setShowReset(false);
    }
  }, [prop.switch]);

  //TOASTS

  const NoUserNotify = () =>
    toast.error("User doesn't exists.", {
      position: "top-center",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });


  return (
    <>
      <div
        className="above-data"
        style={{ display: showReset ? "none" : "block" }}
      >
        <p className="signup-head">Login to Your Account</p>
        <p className="signup-desc">
          Stay Connected-Stay Entertained, Step into the World of YouTube, Join
          the YouTube Community
        </p>
      </div>
      <div
        className="signup-form"
        style={{ display: showReset ? "none" : "flex" }}
      >
        <form onSubmit={SubmitData}>
          <input
            type="email"
            name="email1"
            className={
              theme ? "email" : "email email-light light-mode text-light-mode"
            }
            placeholder="Email Address"
            onChange={handleInputs}
            required
          />
          <input
            type="password"
            name="password1"
            className={
              theme
                ? "password"
                : "password email-light light-mode text-light-mode"
            }
            placeholder="Passcode"
            onChange={handleInputs}
            required
          />
          <p
            className={
              theme ? "forgot-password" : "forgot-password text-light-mode"
            }
            onClick={() => setShowReset(true)}
          >
            Forgot password?
          </p>
          <button
            className={theme ? "signup-btn" : "signup-btn signin-btn-light"}
            type="submit"
          >
            Login to Your Account
          </button>
        </form>
      </div>
      <div
        className="password-reset"
        style={{ display: showReset ? "block" : "none" }}
      >
        <Reset />
      </div>
    </>
  );
}

export default Signin;
