import { setChatOpen, setChatOver, useMaterialUIController } from '@/context';
import CloseIcon from '@mui/icons-material/Close';
import PhotoSizeSelectSmallIcon from '@mui/icons-material/PhotoSizeSelectSmall';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { useEffect, useState } from 'react';

export default function ShopAI() {
  const [controller, dispatch] = useMaterialUIController();
  const { chatOver } = controller;
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      message: "Hi there! I see that you searched for Stanley. Could you please provide me with more information about what you're looking for? Are you looking for a specific product or category? Let me know so I can assist you better",
      like: "0",
    },
    {
      sender: "user",
      message: "hello bot, can you help me? hello bot, can you help me? hello bot, can you help me? hello bot, can you help me?",
    },
    {
      sender: "bot",
      message: "Of course! I'm here to help. What can I assist you with today?",
      like: "0",
    },
    {
      sender: "user",
      message: "thanks you!",
    },
  ]);
  const sendMessage = () => {
    const temp = messages;
    temp.push({
      sender: "user",
      message: inputValue,
    })
    setMessages(temp);
    localStorage.setItem("messages", JSON.stringify(temp));
    setInputValue("");
    setTimeout(() => {
      const element = document.getElementById("chatsContainer");
      element.scrollTop = element.scrollHeight;
    }, 100);
  }
  useEffect(()=>{
    let temp = localStorage.getItem("messages");
    if(!temp) return;
    setMessages(JSON.parse(temp));

    setTimeout(() => {
      const element = document.getElementById("chatsContainer");
      element.scrollTop = element.scrollHeight;
    }, 100);

  }, []);
  const reactionOnMessage = (id, react) => {
    const temp = [];
    for(let i=0;i<messages.length;i+=1){
      if(id !== i) temp.push(messages[i]);
      else {
        temp.push({...messages[i], like: react})
      }
    }
    setMessages(temp);
    localStorage.setItem("messages", JSON.stringify(temp));
  }
  
  return (
    <div className="h-[100%]">
      <div className="h-[10%] border-b-[2px] border-b-[#F2F4F5] flex items-center px-4">
        <div className="font-bold">Shop AI</div>
        <div className="ml-auto flex">
          <div className='mr-4'><PhotoSizeSelectSmallIcon onClick={()=>setChatOver(dispatch, !chatOver)} fontSize='large' className='hover:bg-[#F4F5F8] rounded-full p-2 cursor-pointer' /></div>
          <div><CloseIcon onClick={()=>setChatOpen(dispatch, false)} fontSize='large' className='hover:bg-[#F4F5F8] rounded-full p-2 cursor-pointer' /></div>
        </div>
      </div>
      <div id="chatsContainer" className="h-[80%] px-2 overflow-y-auto noScrollBar">
        {messages.map((value, index) => {
          return(
            <div key={index}>
              <div className={`flex ${value.sender === "user" && "justify-end"} mt-2`}>
                {
                  value.sender === "bot" 
                  ? <>
                  <div>
                    <AutoAwesomeIcon className='mx-1 cursor-pointer rounded-full p-[2px] text-white bg-[#8033EB]' />
                  </div>
                  <div className='bg-[#F2F4F5] max-w-[80%] ml-1 px-4 py-2 text-[13px] font-bold rounded-[10px]'>{value.message}</div>
                  </>
                  : <div className='bg-[#5433EB] text-white max-w-[90%] mr-2 px-4 py-2 text-[13px] font-bold rounded-[10px]'>{value.message}</div>
                }
              </div>
              {value.sender === "bot" && value.like !== "0" && <div className="flex mb-2 text-[12px] text-gray-500 mr-[10%] justify-end">Thank you for leaving feedback</div>}
              {value.sender === "bot" && value.like === "0" && <div className="flex mb-2 text-[12px] text-gray-500 mr-[10%] justify-end">
                <ThumbUpIcon onClick={() => reactionOnMessage(index, "1")} className='mt-1 text-gray-500 cursor-pointer hover:bg-gray-200 mr-2 rounded-full p-1' />      
                <ThumbDownIcon onClick={() => reactionOnMessage(index, "2")} className='mt-1 text-gray-500 cursor-pointer hover:bg-gray-200 rounded-full p-1' />        
                </div>}
            </div>
          )
        })}
      </div>
      <div className="h-[10%] bg-white flex items-center justify-center">
        <form onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}>
          <input placeholder='reply' className={`${chatOver ? "w-[200px]" : "w-[250px]"} bg-[#F2F4F5] px-2 h-[40px] rounded-[5px] outline-none`} type='text' value={inputValue} onChange={(e)=>{setInputValue(e.target.value)}} />
          {inputValue !== "" && <ArrowUpwardIcon onClick={() => sendMessage()} className='mx-1 cursor-pointer cursor-pointer rounded-full p-[2px] text-white bg-[#5433EB] relative right-[35px] bottom-[5px]' />}
        </form>
      </div>
    </div>
  );
}