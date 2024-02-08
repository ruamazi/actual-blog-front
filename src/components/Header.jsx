import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signOutSuccess } from "../redux/user/userSlice";
import { backendUrl } from "../pages/Signup";

const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const resp = await fetch(`${backendUrl}/api/user/sign-out`);
      const data = await resp.json();
      if (!resp.ok) {
        return console.log(data.message);
      }
      dispatch(signOutSuccess());
    } catch (err) {
      console.log(err);
    }
  };

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
        <Button
          onClick={() => dispatch(toggleTheme())}
          className="sm:inline hidden"
          color="gray"
          pill
        >
          {theme === "dark" ? <FaSun size={16} /> : <FaMoon size={16} />}
        </Button>

        {!currentUser ? (
          <Link to={"/sign-in"} className="">
            <Button gradientDuoTone={"purpleToBlue"} outline>
              Sign In
            </Button>
          </Link>
        ) : (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="user avatar" img={currentUser.profilePic} rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">@{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        )}

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
