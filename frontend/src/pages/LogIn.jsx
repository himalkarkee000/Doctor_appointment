import React, { useState } from "react";

const LogIn = () => {
  const [state, setState] = useState("Sign Up");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className="min-h-[80vh] flex items-center" action="">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-96 border rounded-xl text-zinc-600">
          <p className="text-2xl font-semibold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </p>
          <p>
            Please {state === "Sign Up" ? "sign up" : "Login"} to book
            appoinment
          </p>
          {state === "Sign Up" && (
            <div className="w-full">
              <p>Full Name</p>
              <input
                className="border border-zinc-300 rounded w-full p-2 mt-1"
                type="text"
                placeholder="User name"
                onChange={(e) => setName(e.target.name)}
                value={name}
              />
            </div>
          )}
         
          <div className="w-full ">
            <p>Email</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="email"
              placeholder="John@gmail.com"
              onChange={(e) => setEmail(e.target.name)}
              value={email}
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="password"
              placeholder="8-10 digits"
              onChange={(e) => setPassword(e.target.name)}
              value={password}
            />
          </div>
          <button className="bg-primary text-white w-full py-2 rounded-md text-bold">
            {state === "Sign Up" ? "Create Account" : "Login"}
          </button>
          {state === "Sign Up" ? (
            <p>
              Already have an account ?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Login")}
              >
                Log in Here
              </span>
            </p>
          ) : (
            <p>
              Create an new account ?{" "}
              <span
                className="text-primary underline cursor-pointer"
                onClick={() => setState("Sign Up")}
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </>
  );
};

export default LogIn;
