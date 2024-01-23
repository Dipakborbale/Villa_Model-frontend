import React from "react";
import Carousel from "./carousel";
import Navbar from "../common/Navbar";


export const Home2 = () => {
    return (
        <>
        <Navbar user />
            <div className="bg">
                <img src="slide1.jpg" style={{width:"98.75vw", height:"90.8vh"}}/>
            </div> 
                <Carousel>

                </Carousel>


            </>
            )
}
