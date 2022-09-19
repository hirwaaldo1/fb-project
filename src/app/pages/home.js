import React from "react";
import Header from "../components/header";
const Home = () =>{
    return (
        <div className="h-screen" id="body_bg">
            <Header />
            <div className="text-center mt-[5%]">
                <p className="text-[40px] mb-[30px] font-semibold text-white">Welcome</p>
                <p className="text-white ">Lorem Ipsum is simply dummy text of the printing and typesetting <br/> industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  <br /> when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                <button className="btn text-[18px] p-5 bg-[#545e672b] mt-[80px] animate-bounce">Contact Us</button>
            </div>
            
        </div>
    )
}

export default Home