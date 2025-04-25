import Navbar from "./Navbar";
import LeftPanel from "./LeftPanel";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Css/search.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Tooltip from "@mui/material/Tooltip";


function SearchResults() {
  const backendURL = "https://youtube-clone-mern-backend.vercel.app"
  // const backendURL = "http://localhost:3000";
  const { data } = useParams();
  const [searchedVideoData, setsearchedVideoData] = useState([]);

  const [theme, setTheme] = useState(() => {
    const Dark = localStorage.getItem("Dark");
    return Dark ? JSON.parse(Dark) : true;
  });
  const User = useSelector((state) => state.user.user);
  const { user } = User;
  //TOASTS

  const SubscribeNotify = () =>
    toast.success("Channel subscribed!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme ? "dark" : "light",
    });

  //USE EFFECTS

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  document.title = data && data !== undefined ? `${data} - YouTube` : "YouTube";

  useEffect(() => {
    if (theme === false && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "white";
    } else if (theme === true && !window.location.href.includes("/studio")) {
      document.body.style.backgroundColor = "0f0f0f";
    }
  }, [theme]);

  useEffect(() => {
    const getSearchResult = async () => {
      try {
        const response = await fetch(`${backendURL}/search/${data}`);
        const Data = await response.json();
        const { videoData, channelData } = Data;
        setsearchedVideoData(videoData);
        setsearchedChannelData(channelData);
      } catch (error) {
        // console.log(error.message);
      }
    };
    return () => getSearchResult();
  }, [data]);

  useEffect(() => {
    const getChannelID = () => {
      searchedChannelData &&
        searchedChannelData !== "NO DATA" &&
        searchedChannelData.length > 0 &&
        searchedChannelData.map((item) => setChannelID(item._id));
    };

    getChannelID();
  }, [searchedChannelData]);

  useEffect(() => {
    const fetchOtherChannel = async () => {
      try {
        if (channelID) {
          const response = await fetch(
            `${backendURL}/getotherchannel/${channelID}`
          );
          const email = await response.json();
          setUserEmail(email);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchOtherChannel();
  }, [channelID]);

  useEffect(() => {
    const getUserVideos = async () => {
      try {
        if (userEmail !== undefined) {
          const response = await fetch(
            `${backendURL}/getuservideos/${userEmail}`
          );

          const myvideos = await response.json();
          setUserVideos(myvideos);
        }
      } catch (error) {
        // console.log(error.message);
      }
    };

    return () => getUserVideos();
  }, [userEmail]);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        if (user?.email && channelID) {
          const response = await fetch(
            `${backendURL}/checksubscription/${channelID}/${user?.email}`
          );
          const { message } = await response.json();
          if (message === true) {
            setIsSubscribed(true);
          } else {
            setIsSubscribed(false);
          }
        }
      } catch (error) {
        // console.log(error.message);
      }
    };

    return () => checkSubscription();
  }, []);

  //POST REQUESTS

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

  const SubscribeChannel = async (
    youtuberName,
    youtuberProfile,
    youtubeChannelID
  ) => {
    try {
      const channelData = {
        youtuberName,
        youtuberProfile,
        youtubeChannelID,
      };
      if (userEmail && user?.email) {
        const response = await fetch(
          `${backendURL}/subscribe/${channelID}/${user?.email}/${userEmail}`,
          {
            method: "POST",
            body: JSON.stringify(channelData),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data === "Subscribed") {
          setIsSubscribed(true);
        } else {
          setIsSubscribed(false);
        }
      }
    } catch (error) {
      // console.log(error.message);
    }
  };

  if (
    searchedVideoData.length === 1 &&
    searchedVideoData[0].visibility === "Private"
  ) {
    return (
      <>
        <Navbar />
        <LeftPanel />
        <div className="searched-content">
          <img src={nothing} alt="no results" className="nothing-found" />
          <p className={theme ? "no-results" : "no-results text-light-mode"}>
            No results found!
          </p>
        </div>
      </>
    );
  } else if (
    searchedChannelData &&
    searchedChannelData.length > 0 &&
    !searchedVideoData
  ) {
    return (
      <>
        <Navbar />
        <LeftPanel />
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
          <div
            className="searched-content"
            style={{
              top:
                searchedChannelData && searchedChannelData.length > 0
                  ? "200px"
                  : "130px",
              display: loading === true ? "block" : "none",
            }}
          >
         
            <hr
              className={
                theme ? "seperate sep2" : "seperate sep2 seperate-light"
              }
            />
          </div>
        </SkeletonTheme>

       
        {/* SIGNUP/SIGNIN  */}

      </>
    );
  } else if (
    searchedVideoData &&
    searchedVideoData.length > 0 &&
    !searchedChannelData
  ) {
    return (
      <>
        <Navbar />
        <LeftPanel />
        <SkeletonTheme
          baseColor={theme ? "#353535" : "#aaaaaa"}
          highlightColor={theme ? "#444" : "#b6b6b6"}
        >
         
        </SkeletonTheme>
       
      </>
    );
  } else if (
    searchedChannelData &&
    searchedChannelData.length > 0 &&
    searchedChannelData !== "NO DATA" &&
    searchedVideoData &&
    searchedVideoData !== "NO DATA" &&
    searchedVideoData.length > 0
  ) {
    return (
      <>
        <Navbar />
        <LeftPanel />

        {/* EDIT HERE  */}
        
        {/* STOP HERE  */}

      </>
    );
  } else if (
    searchedChannelData === "NO DATA" ||
    searchedChannelData === "" ||
    searchedVideoData === "NO DATA" ||
    searchedVideoData === ""
  ) {
    return (
      <>
        <Navbar />
        <LeftPanel />
       
      </>
    );
  }

  return (
    <>
      <Navbar />
      <LeftPanel />
      <div className="main-trending-section">
        <div className="spin23" style={{ top: "200px" }}>
          <span className={theme ? "loader2" : "loader2-light"}></span>
        </div>
      </div>
    </>
  );
}

export default SearchResults;
