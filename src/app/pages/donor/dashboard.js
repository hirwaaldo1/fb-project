import React,{useLayoutEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, getDocs, where , query } from "firebase/firestore";
import { db } from "../../db/firebase.config";
import HeaderTwo from "../../components/header-two";
import CircularProgress from '@mui/material/CircularProgress';
const DashboardD = () => {  
    const to = useNavigate()
    const data = useLocation()
    const [medicineList,setMedicineList] = useState()
    useLayoutEffect(() => {
        const getData = async () => {
            const medicineCollectionRef = collection(db, "medicine")
            const youMedicine = query(medicineCollectionRef, where("donorId", "==", data.state.id));
            const medicineData = await getDocs(youMedicine);
            setMedicineList(medicineData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    }, [])
    return (
        <div>
            <HeaderTwo />
            <div>  
                <div className="ml-[10%] mr-[10%] mt-[50px]">
                <div className="flex justify-between">
                        <div className="my-auto hidden sm:block">
                            <h5 className="text-textColor text-[16px] font-semibold">My Donations List , Hi {data.state.name} </h5>
                        </div>
                        <div className="">
                            <ul id="botton_down">
                                <li onClick={(()=>{to('/add-donate',{state:data.state})})} className="inline-block mr-[12px] mb-[20px] bg-[#161D41] text-sm font-thin p-2 rounded-lg text-white cursor-pointer">Donate Medicine</li>
                            </ul>
                        </div>
                </div>
                {
                    medicineList === undefined ?
                    <CircularProgress />:
                    <>
                    {
                        medicineList.length === 0 ?  
                        <div className="m-[50px]">
                        <div className=" text-center">
                        <span className="text-[30px] font-semibold" >Oops..</span>
                        <p className="">There are Not Medicine, Please Add them</p>
                        </div>
                        </div>:
                                 <table className="w-full  text-sm text-left text-[#495A69]">
                                 <thead className=" text-[#495A69] bg-transparent text-sm font-[200] p-[20px]">
                                     <tr className="">
                                     
                                         <th scope="col" className="py-3 px-6 font-[200]">
                                         </th>
                                         <th scope="col" className="py-3 px-6 font-[200]">
                                             Medicine Name
                                         </th>
             
                                         <th scope="col" className="py-3 px-6 font-[200]">
                                             Tablet Count
                                         </th>
                                         <th scope="col" className="py-3 px-6 font-[200]">
                                             Ngo
                                         </th>
                                         <th scope="col" className="py-3 px-6 font-[200]">
                                             District
                                         </th>
                                         <th scope="col" className="py-3 px-6 font-[200]">
                                             Sector
                                         </th>   <th scope="col" className="py-3 px-6 font-[200]">
                                             Purchased Date
                                         </th>   <th scope="col" className="py-3 px-6 font-[200]">
                                             Expiry Date
                                         </th> 
             
                                     </tr>
                                 </thead>
                                 <tbody>
                                    {
                                        medicineList.map((v,k)=>{
                                            return (
                                                <tr className={`${(k % 2)  === 0 ? "bg-white" : "bg-[#F5F5F5]"}`} key={k}>
                                         <th scope="row" className="py-9 px-10 font-medium text-gray-900 whitespace-nowrap">
                                             <div  className="bg-[#C4C4C4] text-white rounded-[10px] w-fit h-fit ">
                                                 <img src={v.photo} alt="" className="w-[80px] rounded-[10px]" />
                                             </div>
                                         </th>
                                         <td className="py-4 px-6 text-[#495A69] font-semibold">
                                             {v.medicineName}
                                         </td>
                                         <td className="py-4 px-6  text-[#495A69] ">
                                             {v.tabletCount}
                                         </td>
                                         <td className="py-4 px-6 text-[#495A69]">
                                             {v.ngoName}
                                         </td>
                                         <td className="py-4 px-6 text-[#495A69]">
                                             {v.district}
                                         </td>
                                         <td className="py-4 px-6 text-[#495A69]">
                                             {v.sector}
                                         </td>
                                         <td className="py-4 px-6 text-[#495A69]">
                                             {v.purchasedDate}
                                         </td>
                                         <td className="py-4 px-6 text-[#495A69]">
                                             {v.expiryDate}
                                         </td>
                                     </tr>
                                            )
                                        })    
                                    }
                                     
                                 </tbody>
                             </table>
                                 
                    }
                    </>
                 
                }
              
                </div>
                     
            </div>
        </div>
    )
}

export default DashboardD