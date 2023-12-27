import Marquies from "@/components/Marquies";
import SearchBar from "@/components/SearchBar";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { setScrollY, useMaterialUIController, setSearchText } from "@/context";
import { useCallback, useEffect } from "react";

export default function Home() {
  const [controller, dispatch] = useMaterialUIController();
  const onScroll = useCallback(event => {
    const { pageYOffset } = window;
    setScrollY(dispatch, pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    setSearchText(dispatch, "");
    return () => {
      window.removeEventListener("scroll", onScroll, { passive: true });
    }
  }, []);
  return (
    <DashboardLayout>
      <div className="px-8 py-4 flex flex-col items-center justify-center">
        <Marquies />
        <div className="absolute flex flex-col items-center justify-center top-[200px] z-[997]">
          <img alt="Main Logo" style={{ boxShadow: "0 0 100px 150px white" }} src="./logo.jpg" className="w-[200px]" />
          <div className="w-[1000px]">
            <SearchBar isForHeader={false} /> 
          </div>
        </div>
        <div className="h-[500px]"></div>
      </div>
    </DashboardLayout>
  )
}