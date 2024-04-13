//root layout
import SideBar from "@/components/SideBar/SideBar";
import Header from "@/components/Header/Header";

// RootLayout.jsx
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
      <div className="flex ">
        <div className="lg:block hidden">
          <SideBar />
        </div>
        <div className="lg:pl-64 pl-0 flex w-full h-full min-h-screen flex-col bg-slate-300">
          <Header />
          <div className=" flex-1 text-black p-1 ">
            {children}
          </div>
        </div>
      </div>
    );
  }
