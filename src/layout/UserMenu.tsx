import { Logout, UserMenu as RAUserMenu } from "react-admin";
import { ListItemIcon, ListItemText, MenuItem, MenuList } from "@mui/material";
import { UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

export const UserMenu = () => (
  <RAUserMenu>
    <MenuList disablePadding>
      <MenuItem component={Link} to="/users">
        <ListItemIcon>
          <UserIcon size="1.33em" />
        </ListItemIcon>
        <ListItemText>Users</ListItemText>
      </MenuItem>
      <Logout />
    </MenuList>
  </RAUserMenu>
);
