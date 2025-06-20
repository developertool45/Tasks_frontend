import { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const { user, setUser } = useAuth();
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!email) {
      setError("Please enter your email.");
      setLoading(false);
      return;
    }
    if (user && user.isEmailVerified) {
      setError("Email already verified.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.verifyEmailResend(email);
      if (res.success) {
        setSuccessMsg(res.message || "Verification email sent!");
      } else {
        setError(res.message || "Something went wrong.");
      }
    } catch (error) {
      setError(error.message || "Failed to send verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          📧 Resend Email Verification
        </h2>

        {error && (
          <p className="text-sm text-red-600 mb-3 text-center">{error}</p>
        )}
        {successMsg && (
          <p className="text-sm text-green-600 mb-3 text-center">
            {successMsg}. Please check your inbox.
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 py-2 px-4 text-white rounded transition ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Sending..." : "Send Verification Email"}
        </button>
      </form>
    </div>
  );
};

export default EmailVerification;
