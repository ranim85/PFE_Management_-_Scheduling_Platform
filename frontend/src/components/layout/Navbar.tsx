import { useAppDispatch, useAppSelector } from "@/context/redux";
import { setIsDarkmode, setIsSideBarCollapsed } from "@/state/index";
import { Menu, Bell, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "../ui/button";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthProvider";

const Navbar = () => {
  const AuthSettings = useContext(AuthContext);

  function logout() {
    // AuthSettings.setUser(null)
    AuthSettings.setUserToken(null);
    navigate("/");
  }
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
  const toggleBare = () => {
    dispatch(setIsSideBarCollapsed(!isSideBarCollapsed));
  };
  const isDarMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarMode]);

  const toggleDarkMode = () => {
    dispatch(setIsDarkmode(!isDarMode));
  };
  return (
    <div className="flex justify-between items-center w-full mb-5">
      <div className="flex justify-between items-center gap-5">
        <button
          className="p-3 rounded-full bg-muted hover:bg-accent text-foreground"
          onClick={toggleBare}
        >
          <Menu className="w-4 h-4" />
        </button>
        <div className="relative flex-1 max-w-2xl w-full">
          <input
            type="search"
            placeholder="Search Here"
            className="pl-10 pr-4 py-2 w-full border-2 border-border bg-background text-foreground rounded-lg focus:outline-none focus:border-ring"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex justify-center items-center">
            <Bell size={20} className="text-muted-foreground" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <button onClick={toggleDarkMode}>
            {isDarMode ? (
              <Sun className="text-muted-foreground" size={24} />
            ) : (
              <Moon className="text-muted-foreground" size={24} />
            )}
          </button>
          <Button onClick={logout} variant="outline">LogOut</Button>
          <span className="w-0 h-7 border border-solid border-border mx-3" />
          <div className="flex justify-between items-center gap-x-3">
            <Button>Reset All</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
