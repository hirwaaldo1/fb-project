import React,{useState} from "react";
import { loginNgo } from "../../services/services";
import SignUp from "./signup";
import { useNavigate } from "react-router-dom";
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import IMG1 from './1.svg'
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
  });
const LoginNGo = () =>{
    const [errorMsg,setErrorMsg] = useState()
    const [email,setEmail] = useState()
    const [whichOne,setWhichOne] = useState(0)
    const [password,setPassword] = useState()
    const [loading,setLoading] =useState()
    const to = useNavigate()
    const [opentwo, setOpentwo] = React.useState(false);
    const handleClickOpenDtwo = (e) => {
        setOpentwo(true);
    };

    const handleCloseDtwo = () => {
        setOpentwo(false);
    };
    return(
        <section className="p-[70px]">
        <div className="container">
            <div className="row justify-content-center">
                {
                    whichOne === 0 ? 
                    <div className="col-lg-10">
                    <div className=" text-center">
                        <span className="text-[30px] font-semibold ">Login as NGO</span>
                        <h2 className="title">Welcome back! </h2>
                        <p id="registered_yet">Not registered yet? <u onClick={(()=>setWhichOne(1))}>Create an Account</u></p>
                    </div>
                    <div className="contact-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input"  type="email" onChange={((e)=>{setEmail(e.target.value)})} placeholder="Email *" />
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input" type="password" onChange={((e)=>{setPassword(e.target.value)})} placeholder="Password *" />
                                    </div>
                                    </div>
                                </div>
                            </div>
                            {
                                errorMsg === undefined ? null :
                                <div id="errorMSG"
                                style={{
                                    marginBottom:"20px"
                                }}
                                >
                                    {errorMsg}
                                </div>
                            }
                            <div className="submit-btn text-center">
                            {
                                    loading === true ?
                                    <button type="input" className="btn cursor-not-allowed bg-slate-400 w-[100%] mt-[10px]">
                                    Wait...
                                </button>:
                                    <button type="input" className="btn bg-slate-800 w-[100%] mt-[10px]"
                                        onClick={(()=>{
                                            setLoading(true)
                                            loginNgo(
                                                {
                                                    email:email,
                                                    password:password
                                                },
                                                setLoading,
                                                setErrorMsg,
                                                to,
                                                handleClickOpenDtwo
                                            )
                                        })}
                                    >Submit</button>
                                }
                            </div>
                       
                    </div>
                </div>:<SignUp setWhichOne={setWhichOne} />
                }
             
            </div>
        </div>
        <Dialog
            open={opentwo}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDtwo}
            className="relative"
            aria-describedby="alert-dialog-slide-description"
            >
            <div className="m-[50px]">
            <div className=" text-center">
            <span className="text-[30px] font-semibold" >Oops..</span>
            <p className="">Sorry,Admin didn't Approve Your Account Please Wait for Her</p>
            <img className="text-center" src={IMG1} alt="" />
            </div>
            </div>
            <CloseIcon  onClick={handleCloseDtwo} id="CloseIcon_login"/>
        </Dialog>
    </section>
    )
}

export default LoginNGo