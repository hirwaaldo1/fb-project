import React,{useState} from "react";
import { loginDonor } from "../../services/services";
import SignUp from "./signup";
import { useNavigate } from "react-router-dom";
const Login = () =>{
    const [errorMsg,setErrorMsg] = useState()
    const [phone,setPhone] = useState()
    const [whichOne,setWhichOne] = useState(0)
    const [password,setPassword] = useState()
    const [loading,setLoading] =useState(false)
    const to = useNavigate()
    return(
        <section className="p-[70px]">
        <div className="container">
            <div className="row justify-content-center">
                {
                    whichOne === 0 ? 
                    <div className="col-lg-10">
                    <div className=" text-center">
                        <span className="text-[30px] font-semibold " >Login</span>
                        <h2 className="title">Welcome back! </h2>
                        <p id="registered_yet">Not registered yet? <u onClick={(()=>setWhichOne(1))}>Create an Account</u></p>
                    </div>
                    <div className="contact-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input"  type="number" onChange={((e)=>{setPhone(e.target.value)})} placeholder="Phone *" />
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
                            <div className="submit-btn text-center" style={{marginBottom:"20px"}}>
                            {
                                    loading === true ?
                                    <button type="input" className="btn cursor-not-allowed bg-slate-400 w-[100%] mt-[20px]">
                                    Wait...
                                </button>:
                                    <button type="input" className="btn bg-slate-800 w-[100%] mt-[20px]"
                                    onClick={(()=>{
                                        setLoading(true)
                                        loginDonor(
                                            {
                                                phone:phone,
                                                password:password
                                            },
                                            setLoading,
                                            setErrorMsg,
                                            to
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
    </section>
    )
}

export default Login