import React, { useState } from "react";
import checkEmailPassword from "./checker";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await checkEmailPassword({ email, password });
      if (data.authenticated) {
        setMessage("Authentication successful");
        setFailed(false);
      } else {
        setMessage(data.error);
        setFailed(true);
      }
    } catch (err) {
      setMessage(err.message);
      setFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Authenticator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage(null);
            }}
            required
          />
        </div>
        <div>
          <input
            placeholder="password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setMessage(null);
            }}
            required
          />
        </div>

        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Checking..." : "Check"}
          </button>
        </div>
        {message && (
          <p style={failed ? { color: "red" } : { color: "green" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
