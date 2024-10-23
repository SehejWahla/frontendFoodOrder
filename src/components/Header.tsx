import { Link, useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./ui/MainNav";

const Header = () => {
  const location = useLocation();
  console.log(location.pathname);

  // Check if the current route starts with '/auth'
  const isAuthRoute = location.pathname.startsWith("/auth");

  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-tight text-orange-500"
        >
          quickEats.com
        </Link>
        {!isAuthRoute ? (
          <>
            <div className="md:hidden">
              <MobileNav />
            </div>
            <div className="hidden md:block">
              <MainNav />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
