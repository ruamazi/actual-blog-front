import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Oauth from "../components/Oauth";
import { backendUrl } from "./Signup";

const Signin = () => {
  const [inputV, setInputV] = useState({});
  const navigate = useNavigate();
  const { loading: signing, error: errorMsg } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputV((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputV.email || !inputV.password) {
      dispatch(signInFailure("Please fill out all fields."));
      return;
    }
    dispatch(signInStart());
    try {
      const resp = await fetch(`${backendUrl}/api/auth/signin`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputV),
      });
      const data = await resp.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      if (resp.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <Link to={"/"} className=" font-bold text-5xl">
            <span
              className="pl-2 py-1 bg-gradient-to-r from-rose-700 to-pink-600
       text-white opacity-75 rounded-tl-lg "
            >
              Dev
            </span>
            Blog
          </Link>
          <p className="mt-5 font-semibold text-gray-600">
            This is a demo project, You can sign in with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="Email"
                id="email"
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="Password"
                id="password"
              />
            </div>
            <Button
              disabled={signing}
              type="submit"
              gradientDuoTone={"purpleToPink"}
            >
              {signing ? "Submiting..." : "Submit"}
            </Button>
            <Oauth />
          </form>
          <div className="flex gap-2 my-5 text-sm">
            <span>Have dont have an account?</span>
            <Link to={"/sign-up"} className="text-blue-500">
              Sign Up.
            </Link>
          </div>
          {errorMsg && <Alert color="failure">{errorMsg}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default Signin;
