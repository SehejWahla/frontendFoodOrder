import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/assets/googleLogo.png";
import { decodeToken } from "@/services/auth.utils";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/store/slices/authReducer";
import { useLoginAuth } from "@/hooks/useLoginAuth";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const {
    mutate: login,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  } = useLoginAuth();

  useEffect(() => {
    if (isSuccess && data?.token) {
      localStorage.setItem("token", data.token);
      const userData = decodeToken(data.token);
      if (userData) {
        dispatch(setCredentials({ token: data.token, user: userData }));
      }
      navigate("/dashboard");
    }
  }, [isSuccess, data, navigate, dispatch]);

  useEffect(() => {
    if (isError && error) {
      console.log("isError : ", error);
      console.log(error.data || "Failed to create account");
    }
  }, [isError, error]);

  const validateForm = () => {
    if (password.length < 1) {
      setValidationError("Password can't be empty");
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
    login({ email, password });
    console.log("Login attempted with:", email, password);
  };

  const googlelogin = useGoogleLogin({
    onSuccess: (CodeResponse) => console.log(CodeResponse),
  });

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <Link
            to="/auth/signup"
            className="font-medium text-orange-500 hover:text-orange-400"
          >
            create a new account
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
                  Logged In successfully! Redirecting...
                </div>
              </div>
            )}
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
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  value={email}
                  disabled={isPending}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  value={password}
                  disabled={isPending}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                disabled={isPending}
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-center w-full">
            <Button
              variant="secondary"
              className="w-full flex gap-x-2"
              onClick={() => googlelogin()}
            >
              <img className="w-4 h-4" src={GoogleLogo} alt="Example" />
              Sign in using Google{" "}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
