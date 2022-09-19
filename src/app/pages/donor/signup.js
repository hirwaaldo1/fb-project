import React,{useState} from "react";
import {city} from '../../data/rw'
import { signupDonor } from "../../services/services";
const SignUp = (props) =>{
    const [errorMsg,setErrorMsg] = useState()
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [phone,setPhone] = useState()
    const [address,setAddress] = useState()
    const [address2,setAddress2] = useState()
    const [gender,setGender] = useState()
    const [password,setPassword] = useState()
    const [password2,setPassword2] = useState()
    const [loading,setLoading] =useState(false)
    return (
        <div className="col-lg-10">
                    <div className=" text-center">
                        <span className="text-[30px] font-semibold " >Sign Up</span>
                        <h2 class="title">Join Us And Donate </h2>
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
                                        <input className="input" type="number" onChange={((e)=>{setPhone(e.target.value)})} placeholder="Phone *" />
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
                                    <select id="shortBy" name="select"
                                    onChange={((e)=>{setGender(e.target.value)})}
                                    className="form-select" aria-label="Default select example">
                                        <option value="" hidden select>Gender</option>
                                            {
                                                [
                                                    {
                                                        name:"Female",
                                                        value:"Female"
                                                    },
                                                    {
                                                        name:"Male",
                                                        value:"Male"
                                                    },
                                                ].map((v,k)=>{
                                                    return(
                                                        <option value={v.value} key={k}>{v.name}</option>
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
                            <   button type="input" className="btn bg-slate-800 w-[100%] mt-[20px]"
                                    onClick={(()=>{
                                        setLoading(true)
                                        signupDonor(
                                            {
                                                name:name,
                                                email:email,
                                                phone:phone,
                                                district:address,
                                                sector:address2,
                                                gender:gender,
                                                password:password,
                                                rePassword:password2,
                                                city:"kigali"
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
export default SignUp