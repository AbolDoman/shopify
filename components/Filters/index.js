import { useEffect, useState } from "react"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { filterList } from "@/consts";
import TuneIcon from '@mui/icons-material/Tune';
import { setActiveFilter, useMaterialUIController, setFilterDrawer } from "@/context";
import { Drawer } from "@mui/material";
import DrawerFilter from "./DrawerFilter";
export default function Filters() {
  const [controller, dispatch] = useMaterialUIController();
  const { activeFilter, filterDrawer } = controller;
  useEffect(() => {
    for(let i=0;i<filterList.length;i+=1){
        if (document.getElementById(`menu${i+1}`)) {
            document.getElementById(`menu${i+1}`).style.opacity = "0";
            document.getElementById(`menu${i+1}`).style.zIndex = "0";
        }        
    }
    if (document.getElementById(`menu${activeFilter}`)) {
        document.getElementById(`menu${activeFilter}`).style.opacity = "100%";
        document.getElementById(`menu${activeFilter}`).style.zIndex = "200";
    }
  }, [activeFilter]);
  return (
    <div className="noScrollBar h-[50px] flex w-[100%] overflow-auto">
        <TuneIcon onClick={() => setFilterDrawer(dispatch, true)} fontSize="large" className="ml-8 mr-2 border-[1px] rounded-full p-1 hover:bg-[#F2F4F5] cursor-pointer" />
        <Drawer
            open={filterDrawer}
            onClose={() => setFilterDrawer(dispatch, false)}
          >
            <DrawerFilter />
        </Drawer>
        {filterList.map((value, index) => {
            return(
                <div>
                    <div key={index}
                    onClick={() => {
                        if(value.id === activeFilter) setActiveFilter(dispatch, 0);
                        else setActiveFilter(dispatch, value.id)
                    }}
                    className={`${value.id === activeFilter ? "bg-black text-white" : "bg-white hover:bg-[#F2F4F5]" } 
                    flex items-center transition-all font-[500] justify-center px-2 mx-1 h-[60%] text-[12px] 
                    cursor-pointer rounded-[8px] border-[1px]`}>
                        <div className="mr-1">{value.title}</div>
                        <div><KeyboardArrowDownIcon fontSize="small" className={`${ value.id === activeFilter ? "text-white" : "text-gray-500"}`} /></div>
                    </div>
                    <div id={`menu${value.id}`} className="absolute bg-white w-[300px] transition-all opacity-0 z-[200] p-[10px] rounded-[15px]" style={{ boxShadow: "0 0 10px black" }}>
                        {value.component}
                    </div>
                </div>
            )
        })}
    </div>
  )
}