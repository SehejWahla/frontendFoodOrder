import { useMutation } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type SignUpAuthRequest = {
  email: string;
  password: string;
  name: string;
};

export type SignUpAuthResponse = {
  token: string;
};

export type SignUpError = {
  data: string;
  status: number;
};

export const useSignUpAuth = () => {
  const signUpAuthRequest = async (
    user: SignUpAuthRequest
  ): Promise<SignUpAuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        data: data.data,
        status: response.status,
      } as SignUpError;
    }
    return data;
  };
  return useMutation<SignUpAuthResponse, SignUpError, SignUpAuthRequest>({
    mutationFn: signUpAuthRequest,
  });
};
