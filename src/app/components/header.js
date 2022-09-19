import React from "react";
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Login from "../pages/donor/login";
import LoginNGo from "../pages/ngo/login";
import LoginAdmin from "../pages/admin/login";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });
const Header = () =>{ 
    const [openone, setOpenone] = React.useState(false);
    const [opentwo, setOpentwo] = React.useState(false);
    const [openthree, setOpenthree] = React.useState(false);

    const handleClickOpenD = (e) => {
        setOpenone(true);
    };

    const handleCloseD = () => {
        setOpenone(false);
    };
    const handleClickOpenDtwo = (e) => {
        setOpentwo(true);
    };

    const handleCloseDtwo = () => {
        setOpentwo(false);
    };
    const handleClickOpenDthree = (e) => {
        setOpenthree(true);
    };

    const handleCloseDthree = () => {
        setOpenthree(false);
    };
    return (
        <div className="flex">
            <div className="flex w-[100%] p-4 justify-end">
                <ul>
                    <li className="inline mr-[5px]">
                        <button onClick={(()=>handleClickOpenD())} className="btn">
                                Donate
                        </button>
                    </li>
                    <li className="inline mr-[5px]">
                        <button className="btn" onClick={(()=>handleClickOpenDtwo())}>
                                NGO
                        </button>
                    </li>
                    <li className="inline mr-[5px]">
                        <button className="btn" onClick={(()=>handleClickOpenDthree())}>
                                Admin
                        </button>
                    </li>
                </ul>
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
        <Dialog
            open={opentwo}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDtwo}
            className="relative"
            aria-describedby="alert-dialog-slide-description"
            >
                <LoginNGo />
                <CloseIcon  onClick={handleCloseDtwo} id="CloseIcon_login"/>
        </Dialog>
        <Dialog
            open={openthree}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDtwo}
            className="relative"
            aria-describedby="alert-dialog-slide-description"
            >
                <LoginAdmin />
                <CloseIcon  onClick={handleCloseDthree} id="CloseIcon_login"/>
        </Dialog>
        </div>
    )
}
export default Header