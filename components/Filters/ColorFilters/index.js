import { colors } from '@/consts';
import { setActiveFilter, useMaterialUIController } from '@/context';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function ColorFilters() {
    const [controller, dispatch] = useMaterialUIController();
    const { filterDrawer } = controller;
  const [selectedColors, setSelectedColors] = useState([]);
  const clickOnCheckBox = (id) => {
    let temp = [];
    for(let i=0;i<selectedColors.length;i+=1){
        if(selectedColors[i] !== id) temp.push(selectedColors[i]);
    }
    if(!isChecked(id)) temp.push(id);
    setSelectedColors(temp);
  };
  const isChecked = (id) => {
    for(let j=0;j< selectedColors.length;j+=1){
        if(id === selectedColors[j]){
            return true;
        }
    }
    return false;
  }
  return (
    <div>
        {
            colors.map((value, index) => {
                return(
                    <div key={index} className='flex w-[100%] cursor-pointer my-1'>
                        <div className='flex items-center'>
                            <div className='w-[15px] h-[15px] rounded-[5px] border-[1px]' style={{ backgroundColor: value.color }} />
                            <div className='ml-1'>{value.title}</div>
                        </div>
                        <div className='ml-auto'><Checkbox checked={isChecked(value.id)} id={`check${value.id}`} onChange={() => clickOnCheckBox(value.id)} {...label} /></div>
                    </div>
                )
            })
        }
        {!filterDrawer && <div className='flex'>
            <div onClick={() => {setSelectedColors([]);}}
                className={`w-[50%] mx-1 font-bold ${selectedColors.length === 0 ? "text-gray-500" : "text-black hover:opacity-100"} opacity-80 py-1 rounded-[10px] flex items-center justify-center cursor-pointer bg-[#F2F4F5]`}>Reset</div>
            <div onClick={() => {setActiveFilter(dispatch, 0);}} className='w-[50%] font-bold rounded-[10px] flex items-center justify-center py-1 cursor-pointer bg-black text-white ml-auto'>Done</div>
        </div>}
    </div>
  )
}