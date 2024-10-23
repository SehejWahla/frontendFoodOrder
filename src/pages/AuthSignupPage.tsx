import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogo from "@/assets/googleLogo.png";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { useSignUpAuth } from "@/hooks/useSignUpAuth";

const AuthSignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const {
    mutate: signUp,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  } = useSignUpAuth();

  // Handle successful signup
  useEffect(() => {
    if (isSuccess && data?.token) {
      // Store the token
      localStorage.setItem("token", data.token);
      // Show success message
      console.log("Account created successfully!");
      // Redirect to dashboard
      navigate("/dashboard");
    }
  }, [isSuccess, data, navigate]);

  // Handle error state
  useEffect(() => {
    if (isError && error) {
      console.log("isError : ", error);
      console.log(error.data || "Failed to create account");
    }
  }, [isError, error]);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    signUp({
      name,
      email,
      password,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/auth"
            className="font-medium text-orange-500 hover:text-orange-400"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 flex flex-col gap-y-3">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Form validation error */}
            {validationError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{validationError}</div>
              </div>
            )}

            {/* API error */}
            {isError && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  {error?.data || "An error occurred during sign up"}
                </div>
              </div>
            )}

            {/* Success message */}
            {isSuccess && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">
                  Account created successfully! Redirecting...
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm disabled:bg-gray-100"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm disabled:bg-gray-100"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm disabled:bg-gray-100"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm disabled:bg-gray-100"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating Account...
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          <div className="flex justify-center w-full">
            <Button
              variant="secondary"
              className="w-full flex gap-x-2"
              onClick={() => login()}
              disabled={isPending}
            >
              <img className="w-4 h-4" src={GoogleLogo} alt="Example" />
              Sign up using Google{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthSignupPage;
