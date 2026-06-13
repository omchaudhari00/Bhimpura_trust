import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { loggedIn, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (loggedIn) {
    return <Navigate to="/donors" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto flex min-h-[80vh] max-w-md items-center px-5 pb-24 pt-36 md:px-8">
      <div className="w-full rounded-[2rem] border border-ink/8 bg-white/55 p-8 shadow-[0_24px_60px_rgba(20,17,15,0.08)]">
        <p className="section-label">Admin Access</p>
        <h1 className="mt-3 font-display text-5xl text-ink">Login</h1>
        <p className="mt-3 text-sm text-mist">
          Committee members only. Use your registered email and password.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-700">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </section>
  );
}
