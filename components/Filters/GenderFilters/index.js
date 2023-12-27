import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { setActiveFilter, useMaterialUIController } from '@/context';

export default function GenderFilters() {
  const [controller, dispatch] = useMaterialUIController();
  const { filterDrawer } = controller;
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>        
        <FormControl>
        <FormLabel id="genderFilter">Gender</FormLabel>
        <RadioGroup
            aria-labelledby="genderFilter"
            name="genderFilter"
            value={value}
            onChange={handleChange}
            >
            <FormControlLabel value="men" control={<Radio />} label="Men" />
            <FormControlLabel value="women" control={<Radio />} label="Women" />
        </RadioGroup>
        </FormControl>
        
        {!filterDrawer && <div className='flex'>
            <div onClick={() => {setValue('');}}
                className={`w-[50%] mx-1 font-bold ${value === '' ? "text-gray-500" : "text-black hover:opacity-100"} opacity-80 py-1 rounded-[10px] flex items-center justify-center cursor-pointer bg-[#F2F4F5]`}>Reset</div>
            <div onClick={() => {setActiveFilter(dispatch, 0);}} className='w-[50%] font-bold rounded-[10px] flex items-center justify-center py-1 cursor-pointer bg-black text-white ml-auto'>Done</div>
        </div>}
    </div>
  );
}