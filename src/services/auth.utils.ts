import { user } from "../store/slices/authReducer";

export const decodeToken = (token: string): user | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (payload.exp && currentTime > payload.exp) {
      return null;
    }

    return payload as user;
  } catch {
    return null;
  }
};
