import Sidebar from "../Sidebar";
// import TopBar from "../topbar/TopBar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />

      <div className="flex flex-col flex-1">
        {/* <TopBar /> */}

        <main className="flex-1 overflow-auto p-6 bg-gray-50">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
