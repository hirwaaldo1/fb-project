import React,{useState} from "react";
import {city} from '../../data/rw'
import { signupNgo } from "../../services/services";
const SignUpNGO = (props) =>{
    const [errorMsg,setErrorMsg] = useState()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [address,setAddress] = useState()
    const [address2,setAddress2] = useState()
    const [password,setPassword] = useState()
    const [password2,setPassword2] = useState()
    const [loading,setLoading] =useState()
    return (
        <div className="col-lg-10">
                    <div className=" text-center">
                        <span className="text-[30px] font-semibold " >Sign Up</span>
                        <h2 class="title">Join Us And NGo </h2>
                        <p id="registered_yet">You Have Account? <u onClick={(()=>props.setWhichOne(0))}>Login To Account</u></p>
                    </div>
                    <div className="contact-form">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input"  type="name" onChange={((e)=>{setName(e.target.value)})} placeholder="Name *" />
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input" type="email" onChange={((e)=>{setEmail(e.target.value)})} placeholder="Email *" />
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                    <select id="shortBy" name="select"
                                    onChange={((e)=>{setAddress(e.target.value)})}
                                    className="form-select" aria-label="Default select example">
                                        <option value="" hidden select>District</option>
                                            {
                                                city[0].districts.map((v,k)=>{
                                                    return(
                                                        <option value={v.name} key={k}>{v.name}</option>
                                                                )
                                                            })
                                            }
                                    </select>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                    <select id="shortBy" name="select"
                                    onChange={((e)=>{setAddress2(e.target.value)})}
                                    className="form-select" aria-label="Default select example">
                                        <option value="" hidden select>Sectors</option>
                                            
                                                {
                                                    address === undefined ? 
                                                    <option value="" disabled>Please First Select District !...</option>
                                                    :
                                                    <>
                                                     {
                                                city[0].districts[(address === "Nyarugenge" ? 0 : address ==="Gasabo" ? 1 : address ==="Kicukiro" ? 2 : [] )].sectors.map((v,k)=>{
                                                    return(
                                                        <option value={v.name} key={k}>{v.name}</option>
                                                                )
                                                            })
                                                    }
                                                    </>
                                                }
                                            
                                            
                                           
                                    </select>
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
                                <div className="col-md-12">
                                    <div className="form-grp">           
                                    <div className="form-grp">
                                        <input className="input" type="password" onChange={((e)=>{setPassword2(e.target.value)})} placeholder="Confirm Password *" />
                                    </div>
                                    </div>
                                </div>
                            

                            </div>
                            <div className="submit-btn text-center" style={{marginBottom:"20px"}}>
                            {
                                errorMsg === undefined ? null :
                                <div id="errorMSG"
                    
                                >
                                    {errorMsg}
                                </div>
                            }
                             {
                                loading === true ? 
                                <button type="input" className="btn cursor-not-allowed bg-slate-400 w-[100%] mt-[20px]">
                                    Wait...
                                </button>:
                            <button type="input" className="btn bg-slate-800 w-[100%] mt-[30px]"
                                   onClick={(()=>{
                                    setLoading(true)
                                    signupNgo(
                                        {
                                            name:name,
                                            email:email,
                                            district:address,
                                            sector:address2,
                                            password:password,
                                            rePassword:password2,
                                            city:"kigali",
                                            isActive:false
                                        },
                                        setLoading,
                                        setErrorMsg,
                                        props.setWhichOne
                                    )
                                })}
                                    >Submit</button>
                            }
                            </div>
                       
                    </div>
                </div>
    )
}
export default SignUpNGO