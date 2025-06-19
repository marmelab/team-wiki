import {
  SolarMenu,
  useSolarSidebarActiveMenu,
} from "@react-admin/ra-navigation";
import { SearchWithResult } from "@react-admin/ra-search";
import { SearchIcon } from "lucide-react";

const SearchPanel = () => {
  const [, setActiveMenu] = useSolarSidebarActiveMenu();
  const handleClose = () => {
    setActiveMenu("");
  };

  return <SearchWithResult onNavigate={handleClose} />;
};

export const SearchMenuItem = () => (
  <SolarMenu.Item
    icon={<SearchIcon />}
    label="Search"
    name="search"
    subMenu={<SearchPanel />}
  />
);
