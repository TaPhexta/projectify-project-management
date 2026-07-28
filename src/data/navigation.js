import {
  MdDashboard,
  MdFolder,
  MdCalendarMonth,
  MdSettings,
  MdPerson,
} from "react-icons/md";

const navigation = [
  {
    name: "Dashboard",
    path: "/",
    icon: MdDashboard,
  },
  {
    name: "Projects",
    path: "/projects",
    icon: MdFolder,
  },
  {
    name: "Calendar",
    path: "/calendar",
    icon: MdCalendarMonth,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: MdSettings,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: MdPerson,
  },
];

export default navigation;
