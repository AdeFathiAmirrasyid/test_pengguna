import React, { useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register({ setRegisters }) {
  const inputUsername = useRef(null);
  const inputFullname = useRef(null);
  const inputCity = useRef(null);
  const inputStatus = useRef(null);
  const inputPassword = useRef(null);
  const navigate = new useNavigate();

  const handleRegister = async (event) => {
    if (event) event.preventDefault();
    const username = inputUsername.current.value;
    const fullname = inputFullname.current.value;
    const city = inputCity.current.value;
    const status = inputStatus.current.value;
    const password = inputPassword.current.value;

    axios
      .post(
        "http://127.0.0.1:8005/api/auth/register",
        {
          username: username,
          fullname: fullname,
          city: city,
          status: status,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        axios.get("http://127.0.0.1:8005/api/auth/register").then((response) => {
          setRegisters(response.data.data);
          toast.success("Mahasiswa berhasil ditambahkan!");
        });
        navigate("/login");
      });
  };

  return (
    <div className="container col-md-4 mt-5">
      <h1>Register</h1>
      <form action="">
        <div className="form-floating mb-3">
          <input ref={inputUsername} type="text" className="form-control" id="username" placeholder="name@example.com" />
          <label htmlFor="username">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input ref={inputFullname} type="text" className="form-control" id="fullname" placeholder="name@example.com" />
          <label htmlFor="fullname">Nama Lengkap</label>
        </div>
        <div className="form-floating mb-3">
          <input ref={inputCity} type="text" className="form-control" id="city" placeholder="name@example.com" />
          <label htmlFor="city">City</label>
        </div>
        <select ref={inputStatus} className="form-select mb-3 p-3" aria-label="Default select example">
          <option hidden>Pilih..</option>
          <option value="lajang">Lajang</option>
          <option value="menikah">Menikah</option>
          <option value="duda">Duda</option>
          <option value="janda">Janda</option>
        </select>
        <div className="form-floating">
          <input ref={inputPassword} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="mt-4 col-sm-12 btn btn-primary" onClick={handleRegister}>
          Register
        </button>
        <p className="p-2">
          Sudah punya akun ?
          <Link to="/login" className="text-decoration-none">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
