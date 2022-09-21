import React from "react";
import Header from "../components/header";
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Login from "../pages/donor/login";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });
const Home = () =>{
    const [openone, setOpenone] = React.useState(false);
    const handleClickOpenD = (e) => {
        setOpenone(true);
    };

    const handleCloseD = () => {
        setOpenone(false);
    };
    return (
        <div className="h-screen" id="body_bg">
            <Header />
            <div className="text-center mt-[5%]">
                <p className="text-[40px] mb-[30px] font-semibold text-white">Welcome To We Donate</p>
                <p className="text-white  text-[26px]">“Change will not come if we wait for some other person or some other time. <br/> We are the ones we’ve been waiting for. We are the change that we seek."</p>
                <button className="btn text-[18px] p-5 bg-[#545e672b] mt-[80px] animate-bounce"
                onClick={(()=>{
                    handleClickOpenD()
                })}
                >Donate</button>
            </div>
            <Dialog
            open={openone}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseD}
            className="relative"
            aria-describedby="alert-dialog-slide-description"
            >
                <Login />
                <CloseIcon  onClick={handleCloseD} id="CloseIcon_login"/>
        </Dialog>
        </div>
    )
}

export default Home