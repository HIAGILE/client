import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import logoWhite from "../../images/logoWhite.svg";

type LogoType = {
  className?: string;
  mode: string;
};
const Logo = ({ className, mode }: LogoType) => {
  return (
    <Link to="/" className={`flex items-center sm:mb-28 ${className}`}>
      {mode === "login" ? (
        <img src={logo} alt="Logo" />
      ) : (
        <img src={logoWhite} alt="Logo" />
      )}
      <h2
        className={`font-medium text-md ml-2  ${
          mode === "login" ? "text-darkBlue" : "text-lightGray"
        }`}
      >
        Hi, Agile!
      </h2>
    </Link>
  );
};

export default Logo;
