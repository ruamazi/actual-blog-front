import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Signup = () => {
  const [inputV, setInputV] = useState({});
  const [creating, setCreating] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputV((prev) => ({ ...prev, [e.target.id]: e.target.value.trim() }));
    console.log(inputV);
  };

  const createUser = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!inputV.username || !inputV.email || !inputV.password) {
      return setErrorMsg("Please fill out all fields.");
    }
    setCreating(true);
    try {
      const resp = await fetch(`${backendUrl}/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputV),
      });
      const data = await resp.json();
      setCreating(false);
      if (data.success === false) {
        return setErrorMsg(data.message);
      }
      if (resp.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setCreating(false);
      console.log(error);
      return setErrorMsg(error.message);
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
            This is a demo project, You can sign up with your email and password
            or with Google.
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={createUser}>
            <div>
              <Label value="Your username" />
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Username"
                id="username"
              />
            </div>
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
              disabled={creating}
              type="submit"
              gradientDuoTone={"purpleToPink"}
            >
              {creating ? "Submiting..." : "Submit"}
            </Button>
          </form>
          <div className="flex gap-2 my-5 text-sm">
            <span>Have an account?</span>
            <Link to={"/sign-in"} className="text-blue-500">
              Sign in.
            </Link>
          </div>
          {errorMsg && <Alert color="failure">{errorMsg}</Alert>}
        </div>
      </div>
    </div>
  );
};

export default Signup;
