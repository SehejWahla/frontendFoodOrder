import { Button } from "./button";
import { Link } from "react-router-dom";
const MainNav = () => {
  return (
    <Link
      to="/auth"
      className="font-bold text-xl hover:text-orange-500 hover:bg-white"
    >
      Log In
    </Link>
  );
};

export default MainNav;
