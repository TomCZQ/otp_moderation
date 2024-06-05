import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar-header/Navbar-header";
import User from "../UserProfile/UserProfile";
import "../Drawer/Drawer.css";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  React.useEffect(() => {
    if (open) {
      document.body.style.paddingRight = "0px";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
  }, [open]);

  // Use the onClose prop of Drawer to ensure the body styles are reset
  const handleDrawerClose = () => {
    setOpen(false);
    document.body.style.paddingRight = "";
    document.body.style.overflow = "";
  };

  const DrawerList = (
    <Box
      sx={{
        width: 200,
        backgroundColor: "#1b1b1b",
        color: "white",
        height: "100%",
      }}
      onClick={handleDrawerClose}
    >
      <List>
        <User />
      </List>
      <Divider />
      <Navbar />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Drawer
        anchor="right" // Change the anchor to "right"
        open={open}
        onClose={handleDrawerClose}
        disableScrollLock={true}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
