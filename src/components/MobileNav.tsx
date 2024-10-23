import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu } from "lucide-react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-2">
        <SheetTitle>
          <span>Welcome to quicEats.com!</span>
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex">
          <Link
            to="/auth"
            className="font-bold text-xl hover:text-orange-500 hover:bg-white"
          >
            Log In
          </Link>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
