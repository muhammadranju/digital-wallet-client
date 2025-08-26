import { Wallet } from "lucide-react";
import { Link } from "react-router";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

const Footer = () => {
  return (
    <footer className="border-t py-12 px-4">
      <div className="container mx-auto relative">
        <div className="grid md:grid-cols-4 gap-8 z-50">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wallet className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">PayWallet</span>
            </div>
            <p className="text-muted-foreground">
              The future of digital payments, available today.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/features" className="hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center items-center lg:-my-16 z-0">
          <strong className="uppercase lg:text-[15em]  md:text-[8em] text-[40px] font-black">
            <LineShadowText>PayWallet</LineShadowText>
          </strong>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} PayWallet. All rights reserved by{" "}
            {""}{" "}
            <a
              href="https://www.mdranju.xyz"
              className="font-bold hover:text-primary"
              target="_blank"
            >
              Md. Ranju
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
