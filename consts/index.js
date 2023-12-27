import ColorFilters from "@/components/Filters/ColorFilters";
import Test from "@/components/Filters/Test";
import GenderFilters from "@/components/Filters/GenderFilters";

const suggestedTexts = ["pet toys pet ys","white skate shoes", "black jacketk jack jacket", "beautiful folan", "solar powerd lights", "smart home devices", "eco-friendly review", "Compact cameras plants", "protein whey for fitness"]
const searchHelpTexts = [
    {
        type: "shop",
        title: "mezoon ari",
        score: "4.5",
        productsNumber: 23,
        image: "./images/sample1.png"
    },
    {
        type: "shop",
        title: "Kutn",
        score: "3.5",
        productsNumber: 4342,
        image: "./images/sample1.jpg"
    },
    {
        type: "shop",
        title: "Samara",
        score: "4.5",
        productsNumber: 10,
        image: "./images/sample2.jpg"
    },
    {
        type: "shop",
        title: "Faidly",
        score: "3",
        productsNumber: 34,
        image: "./images/sample3.jpg"
    },
    {
        type: "shop",
        title: "CJ Deata",
        score: "5",
        productsNumber: 1112,
        image: "./images/sample4.jpg"
    },
    {
        type: "product",
        title: "shower",
    },
    {
        type: "product",
        title: "clue jacket",
    },
    {
        type: "product",
        title: "switter",
    },
    {
        type: "product",
        title: "shalwar",
    },
    {
        type: "product",
        title: "pirahan",
    },
    {
        type: "product",
        title: "kravat",
    },
    {
        type: "joorab",
        title: "kravat",
    },
    {
        type: "product",
        title: "dastkesh",
    },
]
const images1 = ["./images/sample1.jpg","./images/sample2.jpg","./images/sample3.jpg","./images/sample4.jpg","./images/sample5.jpg","./images/sample6.jpg","./images/sample7.jpg","./images/sample8.jpg",]
const images2 = ["./images/sample1.png","./images/sample1.png","./images/sample3.png","./images/sample3.jpg","./images/sample5.jpg","./images/sample9.jpg","./images/sample4.jpg","./images/sample1.jpg",]
const images3 = ["./images/sample1.jpg","./images/sample6.jpg","./images/sample1.png","./images/sample4.jpg","./images/sample3.png","./images/sample9.jpg","./images/sample1.jpg","./images/sample3.png",]
const filterList = [
    {
        id: 1,
        title: "Category",
        component: <Test />
    },
    {
        id: 2,
        title: "Color",
        component: <ColorFilters />
    },
    {
        id: 3,
        title: "Gender",
        component: <GenderFilters />
    },
    {
        id: 4,
        title: "On Sale",
        component: <Test />
    },
    {
        id: 5,
        title: "Price from 0 to 440$",
        component: <Test />
    },
    {
        id: 6,
        title: "Ratings",
        component: <Test />
    },
    {
        id: 7,
        title: "Size",
        component: <Test />
    },
    {
        id: 8,
        title: "Sort By",
        component: <Test />
    },
  ] 
const colors = [
    {
        id: 1,
        color: "black",
        title: "Black",
    },
    {
        id: 2,
        color: "white",
        title: "White",
    },
    {
        id: 3,
        color: "blue",
        title: "Blue",
    },
    {
        id: 4,
        color: "gray",
        title: "Gray",
    },
    {
        id: 5,
        color: "pink",
        title: "Pink",
    },
    {
        id: 6,
        color: "gold",
        title: "Gold",
    },
    {
        id: 7,
        color: "yellow",
        title: "Yellow",
    },
]
export {suggestedTexts, searchHelpTexts, images1, images2, images3, filterList, colors}