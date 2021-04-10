import React from "react";
import MyCardList from "../MyCardLsit/MyCardLsit";
import "./Home.css"
import ControlledCarousel from "../ControlledCarousel/ControlledCarousel";
import testImg from "./girl_hair_flower_148949_3840x2160.jpg";

function Home(){
    const imgList = [
        {
        img: testImg,
        title: "Image1"
        },
        {
            img: testImg,
            title: "Image2"
        },
        {
            img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
            title: "Image3"
        }
    ]
    return(
        <div className="Home">
            {/*<div className="img-container">*/}
            {/*    <img src={testImg} alt="test"/>*/}
            {/*</div>*/}
            <ControlledCarousel imgList={imgList}/>
            <MyCardList/>
        </div>
    );
}
export default Home;