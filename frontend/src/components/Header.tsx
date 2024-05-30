import { Box } from "@mui/material";

import logo from "../assets/logo.png";

const Header = () => {
  return (
    <Box sx={{ margin: 2 }}>
      <img src={logo} width={150} alt="Logo" className="logo" />
    </Box>
  );
};

export default Header;
