import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
const HeaderTwo = () =>{
    const to = useNavigate()
    return(
        <div className="flex w-[100%] p-4 justify-end bg-[#161D41]">
                <ul>
                    <li className="inline mr-[5px]">
                        <button
                            onClick={(()=>{
                                cogoToast.success("Successfully Logout ")
                                to('/')
                            })}
                            className="btn">
                            <LogoutIcon />
                        </button>
                    </li>
                </ul>
            </div>
    )
}
export default HeaderTwo