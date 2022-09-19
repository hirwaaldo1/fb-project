import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import HeaderTwo from "../../components/header-two";
import { db } from "../../db/firebase.config";
const Actionbuttom = (props) =>{
    const [action,setAction] = useState(props.actionDb)
    const [loading,setLoading] = useState(false)
    const  functionAction = async () =>{
        setLoading(true)
        if(action === true){
            const userDoc = doc(db,"ngo",props.ngoData.id)
            const newField = {isActive:false}
            await updateDoc(userDoc,newField)
            setAction(false)
            setLoading(false)
        }else{
            const userDoc = doc(db,"ngo",props.ngoData.id)
            const newField = {isActive:true}
            await updateDoc(userDoc,newField)
            setAction(true)
            setLoading(false)
        }
    }
    return(
        <>
        {
            loading === true ?
            <button className="bg-gray-500 cursor-not-allowed text-white p-2">Wait..</button>
            :<>
            {
            action === false ?
            <button className="bg-green-500 text-white p-2" onClick={(()=>{functionAction()})}>Approve</button>:
            <button className="bg-gray-600 text-white p-2" onClick={(()=>{functionAction()})}>UnApprove</button>
            }
            </>
        }

        </>
    )
}
const DashbordAdmin = () =>{
    const [alldata,setData] = useState()
    useLayoutEffect(()=>{
        const ngoCollectionRef = collection(db,"ngo")
        const getData = async () =>{
            const datas = await getDocs(ngoCollectionRef)
            setData(datas.docs.map((doc)=>({...doc.data(),id:doc.id})))
        }
        getData()
    },[])
    return (
        <div>
        <HeaderTwo />
        <div>  
            <div className="ml-[10%] mr-[10%] mt-[50px]">
            <div className="flex justify-between">
                    <div className="my-auto hidden sm:block">
                        <h5 className="text-textColor text-[16px] font-semibold">NGO List , Hi Admin</h5>
                    </div>
            </div>
            <table className="w-full  text-sm text-left text-[#495A69]">
                <thead className=" text-[#495A69] bg-transparent text-sm font-[200] p-[20px]">
                    <tr className="">
                        <th scope="col" className="py-3 px-6 font-[200]">
                        
                        </th>
                        <th scope="col" className="py-3 px-6 font-[200]">
                            Name
                        </th>

                        <th scope="col" className="py-3 px-6 font-[200]">
                            Email
                        </th>
                        <th scope="col" className="py-3 px-6 font-[200]">
                            City
                        </th>
                        <th scope="col" className="py-3 px-6 font-[200]">
                            District
                        </th>
                        <th scope="col" className="py-3 px-6 font-[200]">
                            Sector
                        </th>  
                        <th scope="col" className="py-3 px-6 font-[200]">
                            Action
                        </th>

                    </tr>
                </thead>
                <tbody>
                    {
                        alldata === undefined ?
                        null :
                        <>
                             {
                        alldata.map((v,k)=>{
                            return(
                            <tr className={`${(k % 2)  === 0 ? "bg-white" : "bg-[#F5F5F5]"}`} key={k}>
                                <th scope="row" className="py-9 px-10 font-medium text-gray-900 whitespace-nowrap">
                                    <div className=" py-4 px-6 bg-[#C4C4C4] text-white rounded-[10px] w-fit h-fit p-4">
                                        {k+1}
                                    </div>
                                </th>
                                <td className="py-4 px-6 text-[#495A69] font-semibold">
                                    {v.name}
                                </td>
                                <td className="py-4 px-6  text-[#495A69] ">
                                    {v.email}
                                </td>
                                <td className="py-4 px-6 text-[#495A69]">
                                    {v.city}
                                </td>
                                <td className="py-4 px-6 text-[#495A69]">
                                    {v.district}
                                </td>
                                <td className="py-4 px-6 text-[#495A69]">
                                    {v.sector}
                                </td>
                                <td className="py-4 px-6 text-[#495A69]">
                                    <Actionbuttom actionDb={v.isActive} ngoData = {v} />
                                </td>
                            
        
                            </tr>
                            )
                        })
                    }
                        </>
                    }
               
                </tbody>
            </table>
            </div>
                 
        </div>
    </div>

    )
}
export default DashbordAdmin 