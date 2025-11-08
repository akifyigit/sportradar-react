import Sidebar from "../Sidebar";
import TopBar from "../TopBar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar />

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 ">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
