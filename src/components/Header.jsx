import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

const Header = () => {
  const path = useLocation().pathname;

  return (
    <Navbar className=" border-b-2">
      <Link to={"/"} className=" font-semibold text-xl">
        <span
          className="pl-2 py-1 bg-gradient-to-r from-rose-700 to-pink-600
         text-white opacity-75 rounded-tl-lg "
        >
          Dev
        </span>
        Blog
      </Link>
      <form>
        <TextInput
          className="hidden lg:inline"
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
        />
      </form>
      <Button className="w-10 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch size={20} />
      </Button>
      <div className="flex items-center gap-2 md:order-2">
        <Button className="sm:inline hidden" color="gray" pill>
          <FaMoon size={16} />
        </Button>
        <Link to={"/sign-in"} className="">
          <Button gradientDuoTone={"purpleToBlue"} outline>
            Sign In
          </Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
