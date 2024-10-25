import { user } from "../store/slices/authReducer";

export const decodeToken = (token: string): user | null => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    console.log(currentTime, payload.exp);

    if (!payload.exp) return null;

    if (payload.iat && currentTime > payload.exp) {
      return null;
    }

    console.log("payload", payload);

    return payload as user;
  } catch {
    return null;
  }
};
