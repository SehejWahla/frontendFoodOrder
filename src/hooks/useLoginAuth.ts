import { useMutation } from "@tanstack/react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export type LoginAuthRequest = {
  email: string;
  password: string;
};

export type LoginAuthResponse = {
  token: string;
};

export type LoginError = {
  data: string;
  status: number;
};

export const useLoginAuth = () => {
  const loginAuthRequest = async (
    creds: LoginAuthRequest
  ): Promise<LoginAuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(creds),
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        data: data.data,
        status: response.status,
      } as LoginError;
    }
    return data;
  };

  return useMutation<LoginAuthResponse, LoginError, LoginAuthRequest>({
    mutationFn: loginAuthRequest,
  });
};
