import { ReactComponent as LogoDark } from "../assets/images/logos/AveryBit_Medium_Blue (1) (2).svg";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/starter">
      <LogoDark />
    </Link>
  );
};

export default Logo;
