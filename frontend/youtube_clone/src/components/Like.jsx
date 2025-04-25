import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";
import { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import nothing from "../img/nothing.png";
import "../Css/likevideos.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
function LikeVideos() {
  const backendURL = "https://youtube-clone-mern-backend.vercel.app";
  // const backendURL = "http://localhost:3000";
  const [menuClicked, setMenuClicked] = useState(() => {
    const menu = localStorage.getItem("menuClicked");
    return menu ? JSON.parse(menu) : false;
  });
  const [videolike, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  document.title = "Liked videos - YouTube";

  const User = useSelector((state) => state.user.user);
  const { user } = User;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  useEffect(() => {
    localStorage.setItem("menuClicked", JSON.stringify(menuClicked));
  }, [menuClicked]);

  useEffect(() => {
    const getLikeVideos = async () => {
      try {
        if (user?.email) {
          const response = await fetch(
            `${backendURL}/getlikevideos/${user?.email}`
          );
          const result = await response.json();
          setLikedVideos(result);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };
    getLikeVideos();
  }, [user?.email]);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);

  useEffect(() => {
    const handleMenuButtonClick = () => {
      setMenuClicked((prevMenuClicked) => !prevMenuClicked);
    };

    const menuButton = document.querySelector(".menu-light");
    if (menuButton) {
      menuButton.addEventListener("click", handleMenuButtonClick);
    }

    return () => {
      if (menuButton) {
        menuButton.removeEventListener("click", handleMenuButtonClick);
      }
    };
  }, []);

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  const updateViews = async (id) => {
    try {
      const response = await fetch(`${backendURL}/updateview/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
    } catch (error) {
      // console.log(error.message);
    }
  };

  if (videolike === "NO DATA") {
    return (
      <>
        <Navbar />
        <LeftPanel />
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p className={theme ? "no-results" : "no-results text-light-mode"}>
            No videos found!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <LeftPanel />
      <div
        className={
          theme
            ? "liked-video-data"
            : "liked-video-data light-mode text-light-mode"
        }
      >
        {videolike?.length > 0 ? (
          <div
            className="like-video-sections"
            style={menuClicked === false ? { left: "80px" } : { left: "255px" }}
          >
            <div
              className={
                theme ? "like-left-section" : "like-left-section-light"
              }
              style={{
                backgroundImage: `url(${videolike[0]?.thumbnailURL})`,
              }}
            >
            </div>
          </div>
        ) : (
          <div className="main-trending-section">
            <div className="spin23" style={{ top: "200px" }}>
              <span className={theme ? "loader2" : "loader2-light"}></span>
            </div>
          </div>
        )}
      </div>

      {/* SECONDARY WATCH LATER */}

    </>
  );
}

export default LikeVideos;
