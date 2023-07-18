import React, { useContext, useState } from "react";
import "./signup.css";
import { NavLink } from "react-router-dom";
// import { Logincontext } from '../context/Contextprovider';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sign_in = () => {
  //     const { account, setAccount } = useContext(Logincontext);

  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  console.log(logdata);
  const adddata = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };

  const senddata = async (e) => {
    e.preventDefault();

    const { email, password } = logdata;
    // console.log(email);
    try {
      if (email === "" || password === "") {
        toast.warn("Enter all details", {
          position: "top-right",
        });
      } else {
        const res = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 400 || !data) {
          console.log("invalid details");
          toast.error("Invalid Details !", {
            position: "top-center",
          });
        } else {
          console.log("data valid");
          //   setAccount(data);
          setData({ ...logdata, email: "", password: "" });
          toast.success("Login Successfully done!", {
            position: "top-center",
          });
        }
      }
    } catch (error) {
      console.log("login page has caused the error" + error.message);
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img
            src="https://economictimes.indiatimes.com/thumb/msid-59738992,width-640,height-480,resizemode-75,imgsize-25499/amazon.jpg"
            alt="signupimg"
          />
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-In</h1>

            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={adddata}
                value={logdata.email}
                id="email"
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                onChange={adddata}
                value={logdata.password}
                name="password"
                id="password"
                placeholder="At least 6 characters"
              />
            </div>
            <button type="submit" className="signin_btn" onclick={senddata}>
              Continue
            </button>
          </form>
          <ToastContainer />
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon?</p>
          <NavLink to="/register">
            <button>Create your Amazon Account</button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Sign_in;
