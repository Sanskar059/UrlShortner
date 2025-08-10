import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";


export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("https://urlshortner-3-pq72.onrender.com/api/user/login", form, {
        withCredentials: true, // so cookies are stored
      });
      setMessage(res.data);
      navigate("/")
    } catch (err) {
      setMessage(err.response?.data || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} /><br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} /><br />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
