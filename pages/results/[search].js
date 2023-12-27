import Filters from "@/components/Filters";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { useMaterialUIController, setSearchText, setBookMarks } from "@/context";
import { getProducts } from "@/lib/products";
import { Grid, Rating, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShopAI from "@/components/ShopAI";

export async function getServerSideProps ({params}) {
  const products = await getProducts();
  return {
      props: {
        text: params.search,
        productsData: products,
      },
  };
}
export default function SearchResults({text, productsData}) {
  const [controller, dispatch] = useMaterialUIController();
  const { bookMarks, chatOpen, chatOver } = controller;
  useEffect(()=>{
    setSearchText(dispatch, text);
    let temp = localStorage.getItem("bookMarks");
    if(!temp) return;
    temp = temp.split(",");
    for(let i=0;i<temp.length;i+=1){
      temp[i] = parseInt(temp[i]);
    }
    setBookMarks(dispatch, temp);
  }, []);
  const bookmarkClicked = (id) => {
    const temp = [];
    let isExisted = false;
    for(let i=0;i<bookMarks.length;i+=1){
      if(id !== bookMarks[i]){
        temp.push(bookMarks[i]);
      } else{
        isExisted = true;
      }
    }
    if (!isExisted) temp.push(id);
    setBookMarks(dispatch, temp);
  }
  const isExisted = (id) => {
    for(let i=0;i<bookMarks.length;i+=1){
      if(bookMarks[i]===id) return true;
    }
    return false;
  }
  useEffect(()=>{
    localStorage.setItem("bookMarks", bookMarks);
  }, [bookMarks]);
  return (
    <DashboardLayout>
      <Grid container className="w-[100%] p-2">
        <Grid xs={(chatOpen && !chatOver) ? 9 : 12} container className="noScrollBar bg-white overflow-y-auto overflow-x-hidden h-[85vh] rounded-[20px] p-4">
          <Filters />
          {productsData?.products?.map((value, index) => {
            return(<Grid key={index} xs={12/5}>
              <div className="p-2 z-[100] relative mx-1 my-2 flex justify-center flex-col">
                <div className="w-[150px] h-[150px] overflow-hidden">
                  <img alt={value.id} src={value.image} className="w-[150px] h-[150px] transition-all hover:transform hover:scale-110 object-cover" />
                </div>
                <div className="relative left-[110px] top-[-80px] h-0">
                  <ImageSearchIcon 
                    fontSize="large" 
                    className="text-white bg-gray-500 rounded-full p-2 bg-opacity-70 hover:bg-opacity-90 cursor-pointer " />
                </div>
                <div className="relative left-[110px] top-[-40px] h-0">
                  {isExisted(value.id) ? <FavoriteIcon onClick={() => bookmarkClicked(value.id)}
                    fontSize="large"  className="text-white bg-gray-500 rounded-full p-2 bg-opacity-70 hover:bg-opacity-90 cursor-pointer " /> 
                  : <FavoriteBorderIcon onClick={() => bookmarkClicked(value.id)}
                    fontSize="large"  className="text-white bg-gray-500 rounded-full p-2 bg-opacity-70 hover:bg-opacity-90 cursor-pointer " />}
                </div>
                <div className="noScrollBar text-[12px] text-gray-500 h-[50px] overflow-auto">{value.title}</div>
                <Tooltip title={`rate: ${value.rating.rate} in ${value.rating.count} person`}>
                  <div className="flex my-2">
                      <Rating size="small" color="black" name={value.title} defaultValue={value.rating.rate} precision={0.1} readOnly />
                      <div className="ml-1 text-[8px]">&#40;{value.rating.count}&#41;</div>
                  </div>
                </Tooltip>
                <div className="text-[10px] font-bold">{value.price}$</div>
              </div>
            </Grid>)
          })}
        </Grid>
        {chatOpen && !chatOver && <Grid xs={3}>
          <div className="noScrollBar mx-4 bg-white overflow-hidden h-[85vh] rounded-[20px]">
            <ShopAI />
          </div>
        </Grid>}
        {
          chatOpen && chatOver && <div className="noScrollBar mx-4 w-[250px] absolute border-[1px] z-[900] bg-white overflow-hidden h-[80vh] mt-8 right-[50px] rounded-[20px]">
            <ShopAI />
          </div>
        }
      </Grid>
    </DashboardLayout>
  )
}