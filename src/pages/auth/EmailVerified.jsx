import React, { useState } from "react";
import apiClient from "../../../service/ApiClient";
import { useAuth } from "../../context/Context";
import { Link, useSearchParams } from "react-router-dom";

const EmailVerified = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { user, setUser } = useAuth();

  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerification = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    if (!token) {
      setError("Invalid verification link.");
      setLoading(false);
      return;
    }

    if (user && user.isEmailVerified) {
      setError("Email already verified.");
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.verifyUser(token);
      if (res.success) {
        setSuccessMsg(res.message || "Email successfully verified!");
      } else {
        setError(res.message || "Invalid or expired token");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center mt-10 px-4">
      <form
        onSubmit={handleVerification}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          {successMsg ? "✅ Email Verified" : "📩 Email Verification"}
        </h2>

        {error && (
          <p className="text-sm text-red-600 mb-4 text-center">{error}</p>
        )}
        {successMsg && (
          <p className="text-sm text-green-600 mb-4 text-center">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          disabled={loading || successMsg}
          className={`w-full py-2 px-4 rounded text-white ${
            successMsg
              ? "bg-green-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition duration-300`}
        >
          {loading ? "Verifying..." : successMsg ? "Verified" : "Verify Email"}
        </button>

        <div className="mt-6 text-sm text-center text-gray-700 space-y-2">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
          <p>
            Didn’t get email?{" "}
            <Link
              to="/email-verification"
              className="text-orange-600 hover:underline"
            >
              Resend Verification
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default EmailVerified;
