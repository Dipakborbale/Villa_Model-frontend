import React from "react";
import Carousel from "../user/carousel";
import Navbar from "./Navbar";


export const Home = () => {
    return (
        <>
        <Navbar></Navbar>
            <div className="bg">
                <img src="slide1.jpg" style={{width:"98.75vw", height:"90.8vh"}}/>
            </div> 
                {/* <Carousel>

                </Carousel> */}


            </>
            )
}
