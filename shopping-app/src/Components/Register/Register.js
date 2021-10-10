import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import ReactModal from "react-modal";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");

  const [open, setOpen] = useState(false);
  const [login, setLogin] = useState(false);

  const handle_close = () => {
    setOpen(true);
  };
  const submit = async (e) => {
    e.preventDefault();
    const result = await axios({
      url: "http://shoppingcontroller.eastus.azurecontainer.io:4000/register",
      headers: { "Content-Type": "application/json" },
      method: "POST",
      data: {
        email,
        password: pass,
        user_name: name,
        user_country: country,
        user_city: city,
        user_bio: bio,
      },
    });
    console.log(result.data);
    setLogin(true);
  };
  if (login) return <Redirect to="/login" />;
  return (
    <div>
      {!open ? (
        <ReactModal
          isOpen={true}
          shouldCloseOnOverlayClick={true}
          shouldCloseOnEsc={true}
          onRequestClose={handle_close}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "60%",
            },
          }}
        >
          <h2>Register</h2>
          <form className="reg_form" onSubmit={submit}>
            <input
              placeholder="email"
              required={true}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              placeholder="password"
              required={true}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              value={pass}
            />

            <input
              placeholder="user name"
              required={true}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              placeholder="user country"
              required={true}
              onChange={(e) => setCountry(e.target.value)}
              value={country}
            />

            <input
              placeholder="user city"
              required={true}
              onChange={(e) => setCity(e.target.value)}
              value={city}
            />

            <input
              placeholder="user bio"
              required={true}
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
            <button type="submit" className="submit">
              Register
            </button>
          </form>
        </ReactModal>
      ) : (
        <Redirect to="/" />
      )}
    </div>
  );
};

export default Register;
