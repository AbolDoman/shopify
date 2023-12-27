import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { filterList } from "@/consts";
import { Divider } from '@mui/material';
import { useEffect, useState } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import { useMaterialUIController, setFilterDrawer } from '@/context';

export default function DrawerFilter() {
    const [controller, dispatch] = useMaterialUIController();
  const [openSection, setOpenSection] = useState(0);
  return (
    <div className="noScrollBar w-[300px]">
        <div className="flex px-2 py-4">
            <div className="text-[18px] font-bold">Filters</div>
            <div className="ml-auto"><CloseIcon className='border-[1px] text-white bg-gray-500 rounded-full cursor-pointer' onClick={() => setFilterDrawer(dispatch, false)} /></div>
        </div>
        {
            filterList.map((value,index) => {
                return(
                    <div key={index}>
                        <div className="flex px-2 py-4">
                            <div className="text-[18px] font-bold">{value.title}</div>
                            <div className="ml-auto">
                                {value.id === openSection
                                ? <RemoveIcon onClick={() => {
                                    setOpenSection(0);
                                }}  className='cursor-pointer' /> 
                                : <AddIcon onClick={() => {
                                    setOpenSection(value.id);
                                }} className='cursor-pointer' />}
                            </div>
                        </div>
                        {value.id === openSection && value.component}
                        <Divider />
                    </div>
                )
            })
        }
    </div>
  )
}