import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../user";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = "accessToken";

export default function Profile({ children }) {
  const navigate = useNavigate();
  const user = getUser();
  const [profileName, setProfileName] = useState("");

  useEffect(() => {
    // Fetch and display profile name from the AWS Cognito token
    const fetchProfileName = async () => {
      if (user && user.signInUserSession) {
        const accessToken = user.signInUserSession
          .getAccessToken()
          .getJwtToken();

        try {
          const decodedToken = await CognitoJwtVerifier.verify(accessToken);
          const customProfileName = decodedToken["custom:profileName"];

          if (customProfileName) {
            setProfileName(customProfileName);
            console.log(customProfileName);
          }
        } catch (error) {
          console.error("Token verification failed:", error);
        }
      }
    };

    fetchProfileName();
  }, [user]);
  const logOut = () => {
    if (user) {
      // Clear user session and related information
      user.signOut();

      // Clear stored access token
      localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

      // Redirect to the login page or another appropriate location
      navigate("/");
    }
  };
  return (
    <div
      style={{ margin: "50px 100px", display: "flex", justifyContent: "end" }}
    >
      <div style={{ textAlign: "center" }}>
        <p>Profile</p>
        <p style={{ fontSize: "20px" }}>
          {profileName || "Default Profile Name"}
        </p>
        <div style={{ marginTop: "10px" }}>
          {children}
          <span>&nbsp;</span>
          <button onClick={() => logOut()}>Logout</button>
        </div>
      </div>
    </div>
  );
}
