import { images1, images2, images3 } from "@/consts";
import {  useState } from "react";
import Marquee from "react-fast-marquee";

export default function Marquies() {
  const [row1Play, setRow1Play] = useState(true);
  const [row2Play, setRow2Play] = useState(true);
  const [row3Play, setRow3Play] = useState(true);
  return (
    <>
        <Marquee direction="right" speed={25} play={row1Play}>
          <div className="flex">
            {images1.map((value, index) => {
              return(
                <div key={index} className="h-[200px] w-[200px] rounded-[20px] mx-4 cursor-pointer">
                <img 
                  onMouseOver={() => {
                    setRow1Play(false);
                  }} 
                  onMouseLeave={() => {
                    setRow1Play(true);
                  }} 
                className="h-[200px] w-[200px] rounded-[20px]" src={value} />
                </div>
                )
              })}
          </div>
        </Marquee>
        <Marquee speed={30} className="my-4" play={row2Play}>
          <div className="flex">
            {images2.map((value, index) => {
              return(
                <div key={index} className="h-[200px] w-[200px] rounded-[20px] mx-4 cursor-pointer">
                <img 
                  onMouseOver={() => {
                    setRow2Play(false);
                  }} 
                  onMouseLeave={() => {
                    setRow2Play(true);
                  }} 
                className="h-[200px] w-[200px] rounded-[20px]" src={value} />
                </div>
                )
              })}
          </div>
        </Marquee>
        <Marquee direction="right" speed={25} play={row3Play}>
          <div className="flex">
            {images3.map((value, index) => {
              return(
                <div key={index} className="h-[200px] w-[200px] rounded-[20px] mx-4 cursor-pointer">
                <img 
                  onMouseOver={() => {
                    setRow3Play(false);
                  }} 
                  onMouseLeave={() => {
                    setRow3Play(true);
                  }} 
                className="h-[200px] w-[200px] rounded-[20px]" src={value} />
                </div>
                )
              })}
          </div>
        </Marquee>
    </>
  )
}