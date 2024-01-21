import { Footer as FooterFlowbite } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <FooterFlowbite container className=" border-teal-500 border-t-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          <div className="">
            <Link to={"/"} className=" font-semibold text-sm">
              <span
                className="pl-2 py-1 bg-gradient-to-r from-rose-700 to-pink-600
         text-white opacity-75 rounded-tl-lg "
              >
                Dev
              </span>
              Blog
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterFlowbite.Title title="About" className="mb-3" />
              <FooterFlowbite.LinkGroup col>
                <FooterFlowbite.Link
                  href="https://flux-blog.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Similar Project
                </FooterFlowbite.Link>
                <FooterFlowbite.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  More Info
                </FooterFlowbite.Link>
              </FooterFlowbite.LinkGroup>
            </div>
            <div>
              <FooterFlowbite.Title title="Follow us" className="mb-3" />
              <FooterFlowbite.LinkGroup col>
                <FooterFlowbite.Link
                  href="https://github.com/ruamazi"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Github Page
                </FooterFlowbite.Link>
                <FooterFlowbite.Link href="#">Discord</FooterFlowbite.Link>
              </FooterFlowbite.LinkGroup>
            </div>
            <div>
              <FooterFlowbite.Title title="Legal" className="mb-3" />
              <FooterFlowbite.LinkGroup col>
                <FooterFlowbite.Link href="#">
                  Privacy Policy
                </FooterFlowbite.Link>
                <FooterFlowbite.Link href="#">
                  Terms &amp; Conditions
                </FooterFlowbite.Link>
              </FooterFlowbite.LinkGroup>
            </div>
          </div>
        </div>
        <FooterFlowbite.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterFlowbite.Copyright
            by="Mohssin Aoulad"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <FooterFlowbite.Icon
              href="https://t.me/MohssinA"
              icon={FaTelegramPlane}
            />
          </div>
        </div>
      </div>
    </FooterFlowbite>
  );
};

export default Footer;
