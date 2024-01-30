import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../user";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool, { verifier } from "../UserPool";
import { CognitoJwtVerifier } from "aws-jwt-verify";

export default function Login() {
  const navigate = useNavigate();
  const [params, setParams] = useState({});
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;

    setParams((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

    setError(name, "");
    setError("not_registered", "");
    if (name === "password") {
      setError("incorrect_password", "");
    }
  };

  const user = getUser();

  useEffect(() => {
    // Example: Verify JWT received after successful login
    if (user && user.signInUserSession) {
      const accessToken = user.signInUserSession.getAccessToken().getJwtToken();

      verifier
        .verify(accessToken)
        .then((res) => {
          navigate("/events");
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // if (user) {
    //   navigate("/events");
    // }
  }, [user]); // Ensure to add user as a dependency

  const setError = (name, value) => {
    setErrors((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // const login = () => {
  //     const {email, password} = params;

  //     if (!email) {
  //         setError("email", "email is required");
  //     }

  //     if (!password) {
  //         setError("password", "password is required");
  //     }

  //     if (email && password) {
  //         const users = [];

  //         users.push(...JSON.parse(localStorage.getItem("users")) || []);

  //         const exist = users.find((u) => u?.email === params.email);
  //         if (exist) {
  //             if (exist.password !== params.password) {
  //                 setError("incorrect_password", "Incorrect Password");
  //             } else {
  //                 exist.login = true;
  //                 localStorage.setItem("users", JSON.stringify(users));
  //                 navigate("/events");
  //                 setParams({});
  //             }

  //         } else {
  //             setError("not_registered", "User not Registered");
  //         }
  //     }
  // }

  const login = (e) => {
    e.preventDefault();
    const user = new CognitoUser({
      Username: params.email,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: params.email,
      Password: params.password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        console.log(session);
        const accessToken = session.getAccessToken().getJwtToken();
        // console.log(accessToken);
        // Save the token securely (e.g., in local storage, secure cookie, etc.)
        localStorage.setItem("accessToken", accessToken);

        // Verify the JWT
        verifier
          .verify(accessToken)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        // Redirect or perform other actions as needed
        navigate("/events");
      },
      onFailure: (data) => {
        console.error(data);
      },
      newPasswordRequired: (data) => {
        console.log(data);
      },
    });
  };

  return (
    <div className="card">
      <form className="form" onSubmit={login}>
        <div className="title">
          <p>Login</p>
        </div>
        {!!errors.not_registered && (
          <span className="mandatory">{errors.not_registered}</span>
        )}
        <div className="space"></div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={params.email || ""}
            onChange={handleChange}
          />
          {!!errors.email && <span className="mandatory">{errors.email}</span>}
        </div>
        <div className="space"></div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={params.password || ""}
            onChange={handleChange}
          />
          {!!errors.password && (
            <span className="mandatory">{errors.password}</span>
          )}
          {!!errors.incorrect_password && (
            <span className="mandatory">{errors.incorrect_password}</span>
          )}
        </div>
        <div className="space"></div>
        <div>
          <button>Login</button>
        </div>
        <div className="space"></div>
        <div>
          <span>
            Not registered?{" "}
            <span className="account" onClick={() => navigate("/register")}>
              Create an account
            </span>
          </span>
        </div>
      </form>
    </div>
  );
}
