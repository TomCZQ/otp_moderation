import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {
  faHouse,
  faCalendar,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import Navbar from "../../components/Navbar-header/Navbar-header";
import User from "../UserProfile/UserProfile";
import "../Drawer/Drawer.css";
export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      backgroundColor={"#1b1b1b"}
      color={"white"}
      height={"100%"}
    >
      <List>
        <ListItem>
          <ListItemButton>
            <User />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <Navbar />
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>Open drawer</Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
