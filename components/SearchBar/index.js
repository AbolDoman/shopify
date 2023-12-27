import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import { suggestedTexts, searchHelpTexts } from '@/consts';
import { useMaterialUIController, setSearchText, setInputFocus } from '@/context';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

export default function SearchBar({isForHeader}) {
  const [controller, dispatch] = useMaterialUIController();
  const { searchText, inputFocus, scrollY } = controller;
  const [inputW, setInputW] = useState(0);
  const [textNumber, setTextNumber] = useState(0);
  const [suggestedList, setSuggestedList] = useState([]);
  const isExsited = (n, list) => {
    for(let i=0;i<list.length;i+=1){
        if (list[i] === n) return true;
    }
    return false;
  }
  useEffect(() => {
    let w = document.querySelector('#searchInput')?.offsetWidth;
    setInputW(w);
    let i=0;
    const sList= [];
    while(i<10){
        const foundedNumber =  Math.ceil(Math.random()*100)%searchHelpTexts.length;
        if (!isExsited(searchHelpTexts[foundedNumber], sList)) {
            sList.push(searchHelpTexts[foundedNumber]);
            i+=1;
        }
    }
    setSuggestedList(sList)
  }, [searchText])
  const pathname = usePathname();
  useEffect(() => {
    if (searchText === "") {
        setTimeout(() => {
            for (let i=0;i<suggestedTexts.length;i+=1){
                if (document.querySelector(`#${isForHeader? "" : "menu"}suggest${i}`))
                  document.querySelector(`#${isForHeader? "" : "menu"}suggest${i}`).style.transform = `translateY(${-24*textNumber}px)`;
            }
            if (textNumber <= suggestedTexts.length-1)
                setTextNumber(prev => prev+1);
            else setTextNumber(0);
        }, 2000);
    }
  }, [textNumber])
  const { push } = useRouter();
  return (
    <div className={`${(scrollY <= 350 && isForHeader && pathname === "/") ? "opacity-0" : "opacity-100" } transition-all flex flex-1 items-center justify-center ${isForHeader ? "z-[998]" : "z-[1200]" }`}>
        <div id="searchInput" className={`w-[50%] items-center justify-center ${inputFocus ? "bg-white" : "rounded-[10px] border-[#F2F4F5] bg-[#F2F4F5] border-[1px]"}`}>
        <div className={`flex w-[100%] h-[45px] items-center justify-center ${inputFocus ? "border-x-[1px] rounded-t-[10px] border-t-[1px]" : ""}`}>
            <SearchIcon className='text-gray-500 mx-1 w-[5%]' />
            <form onSubmit={(e) => {
                e.preventDefault();
                setInputFocus(dispatch, false);
                push(`/results/${searchText}`)
            }} className='w-[90%] z-[200]' >
                <input
                    onBlur={() => {
                            setTimeout(()=>{
                                setInputFocus(dispatch, false);
                            }, 500)
                        }} 
                    onFocus={() => setInputFocus(dispatch, true)}
                    className='outline-none z-[200] bg-transparent' 
                    type='text' value={searchText}
                    onChange={(e) => setSearchText(dispatch, e.target.value)} />
            </form>
            {searchText === "" && 
            <div className='relative right-[42%] w-[100%] flex flex-col h-[25px] whitespace-nowrap overflow-hidden text-gray-500'>
                {suggestedTexts.map((value, index)=>{
                    return(
                        <div id={`${isForHeader? "" : "menu"}suggest${index}`} 
                        key={index} 
                        className='transition-all ease-out w-[100%] whitespace-nowrap'>{value}</div>
                    )
                })}
            </div>}
            <div className='w-[8%] flex items-center justify-center'>
                {searchText !== "" && 
                <CloseIcon onClick={() => setSearchText(dispatch, "")} fontSize='small' 
                className='rounded-full cursor-pointer bg-[#F2F4F5] mx-1' />}
            </div>
        </div>
        {inputFocus && 
            <div className={`absolute bg-white border-x-[1px] border-b-[1px] rounded-b-[10px] ${(scrollY<350 && isForHeader && pathname === "/") ? "hidden" : ""}`}
                style={{ width: `${inputW}px` }}>
                {
                suggestedList.map((val, ind) => {
                    return(<div onClick={()=> {setSearchText(dispatch, val.title)}} key={ind} className='h-[50px] px-4 flex items-center cursor-pointer' >
                        <div className='h-[35px] w-[35px] flex items-center justify-center rounded-[5px] border-[1px]'>
                            {val.image && <img alt="image" src={pathname === '/' ? val.image : `.${val.image}`} className='h-[35px] w-[35px] rounded-[5px]' />}
                            {!val.image &&  <SearchIcon className='text-gray-500 p-1' />}
                        </div>
                        <div className='ml-2 flex flex-col'>
                            <div className='text-[16px]'>{val.title}</div>
                            {val.score && <div className='flex text-gray-500 text-[14px]'>
                                <div>{val.score}</div>
                                <div><StarIcon className='text-gray-500 p-1' /></div>
                                <div>&nbsp;&#40;{val.productsNumber}&#41;</div>
                            </div>}
                        </div>
                    </div>)
                })
                }
            </div>}
        </div>
    </div>
  )
}