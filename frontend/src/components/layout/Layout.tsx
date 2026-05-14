import Navbar from "./Navbar";
import LeftSideBar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "@/context/redux";
import Steps from "./steps/Steps";
import { useState } from "react";
import Rooms from "./rooms/Rooms";
import Professors from "./professors/professors";
import Students from "./students/students";
import Projects from "./projects/projects";
import Schedule from "./schedule/schedule";
import Dispo from "./dispo/dispo";
import DateComp from "./date/date";

export default function Layout() {
  const isSideBareCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  const [currentPage, setCurrentPage] = useState<number>(1);

  function renderPage() {
    switch (currentPage) {
      case 1:
        return <Steps />;

      case 2:
        return <Rooms />;

      case 3:
        return <Professors />;

      case 4:
        return <Students />;

      case 5:
        return <Projects />;

      case 6:
        return <Schedule />;
      case 7:
        return <Dispo />;
      case 8:
        return <DateComp />;

      default:
        return <Steps />;
    }
  }
  return (
    <div className="flex bg-background text-foreground w-full min-h-screen">
      <LeftSideBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div
        className={`flex flex-col w-full h-full py-7 px-9 bg-background ${
          isSideBareCollapsed ? "  md:pl-24 " : "md:pl-72"
        }`}
      >
        <Navbar />
        <main>
          {renderPage()}
          <Outlet />
        </main>
      </div>
    </div>
  );
}
