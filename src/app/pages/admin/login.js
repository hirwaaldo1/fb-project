import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../services/services";
const LoginAdmin = () =>{
    const [errorMsg,setErrorMsg] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [loading,setLoading] =useState()
    const to = useNavigate()
    return(
        <section className="p-[70px]">
        <div className="container">
            <div className="row justify-content-center">
                    <div className="col-lg-10">
                    <div className=" text-center">
                        <span className="text-[30px] font-semibold " >Login</span>
                        <h2 className="title">Welcome back! </h2>
                    </div>
                    <div className="contact-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input"  type="email" onChange={((e)=>{setEmail(e.target.value)})} placeholder="Username *" />
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
                                    <button className="btn" id="waiting">Wait.....</button>:
                                    <button type="input" className="btn bg-slate-800 w-[100%] mt-[30px]"
                                    onClick={(()=>{
                                        loginAdmin(
                                            {
                                                email:email,
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
                </div>
             
            </div>
        </div>
    </section>
    )
}

export default LoginAdmin