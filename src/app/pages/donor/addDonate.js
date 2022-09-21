import React, { useState, useLayoutEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import HeaderTwo from "../../components/header-two";
import AddAPhotoRoundedIcon from '@mui/icons-material/AddAPhotoRounded';
import { city } from '../../data/rw'
import { db } from "../../db/firebase.config";
import { useLocation, useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { addMedicine } from "../../services/services";
const AddDonete = () => {
    const [address, setAddress] = useState()
    const [address2, setAddress2] = useState()
    const [ngoList, setNgoList] = useState()
    const [file, setFile] = React.useState([])
    const [medicineName, setMedicineName] = useState()
    const [tablet, setTablet] = useState()
    const [description, setDescription] = useState()
    const [purchased, setPurchased] = useState()
    const [imageValue,setImageValue]= useState()
    const [expiry, setExpiry] = useState()
    const [ngoSelect, setNgoSelect] = useState()
    const [errorMsg, setErrorMsg] = useState()
    const [loading, setLoading] = useState(false)
    const data = useLocation()

    const to = useNavigate()

    useLayoutEffect(() => {
        const getData = async () => {
            const ngoCollectionRef = collection(db, "ngo")
            const ngoActive = query(ngoCollectionRef, where("isActive", "==", true));
            const ngoData = await getDocs(ngoActive);
            setNgoList(ngoData.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    }, [])
    function onChangeFile(event) {
        setFile(file => [...file, event.target.files[0]])
        setImageValue(event.target.files)
        event.preventDefault()
    }

    return (
        <div>
            <HeaderTwo />
            <div>
                <div className="ml-[10%] mr-[10%] mt-[50px]">
                    <div className="flex justify-between">
                        <div className="">
                            <ul id="botton_down">
                                <li onClick={(() => { to(-1) })} className="inline-block mr-[12px] mb-[20px] bg-[#161D41] text-sm font-thin p-2  text-white cursor-pointer">Go Back</li>
                            </ul>
                        </div>
                        <h3 className="text-lg font-semibold">Donate to your NGO</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-[20px]">
                        <div className="">
                            <input className="input mb-[1px] mt-0" onChange={((e) => setMedicineName(e.target.value))} type="Name" placeholder="Medicine Name *" />
                        </div>
                        <div className="">
                            <input className="input mb-[1px] mt-0" placeholder="Purchased Date *" onChange={((e) => setPurchased(e.target.value))} type="text" onFocus={((e) => e.target.type = "date")} />
                        </div>
                        <div className="">
                            <input className="input mb-[1px] mt-0" type="number" onChange={((e) => setTablet(e.target.value))} placeholder="Tablet Count *" />
                        </div>
                        <div className="">
                            <input className="input mb-[1px] mt-0" placeholder="Expiry Date *" onChange={((e) => setExpiry(e.target.value))} type="text" onFocus={((e) => e.target.type = "date")} />
                        </div>
                        <div>
                            <textarea className="input mb-[1px] mt-0 h-[20vh]" onChange={((e) => setDescription(e.target.value))} placeholder="Description">
                            </textarea>
                        </div>
                        <div className="ml-0 mr-0">
                            <select id="shortBy" name="select"
                                onChange={((e) => { setAddress(e.target.value) })}
                                className="form-select" aria-label="Default select example">
                                <option value="" hidden select>District</option>
                                {
                                    city[0].districts.map((v, k) => {
                                        return (
                                            <option value={v.name} key={k}>{v.name}</option>
                                        )
                                    })
                                }
                            </select>
                            <select id="shortBy" name="select"
                                onChange={((e) => { setAddress2(e.target.value) })}
                                className="m-0 p-0" aria-label="Default select example">
                                <option value="" hidden select>Sectors</option>

                                {
                                    address === undefined ?
                                        <option value="" disabled>Please First Select District !...</option>
                                        :
                                        <>
                                            {
                                                city[0].districts[(address === "Nyarugenge" ? 0 : address === "Gasabo" ? 1 : address === "Kicukiro" ? 2 : [])].sectors.map((v, k) => {
                                                    return (
                                                        <option value={v.name} key={k}>{v.name}</option>
                                                    )
                                                })
                                            }
                                        </>
                                }



                            </select>
                        </div>
                        <div id="grid_admin_3">
                            {
                                file.map((v, k) => {
                                    return <div className='grid_admin_3_item' key={k}>
                                        <img src={URL.createObjectURL(v)} alt="" />

                                    </div>
                                })
                            }
                            <input type="file" id="file" name='uploadedImages' style={{ display: "none" }}
                                multiple
                                onChange={(e) => onChangeFile(e)}
                            />
                            {
                                file.length === 0 || file === undefined ?
                                    <label htmlFor="file" >
                                        <AddAPhotoRoundedIcon htmlFor="file" id="AddAPhotoRoundedIcon" />
                                    </label> : null
                            }
                        </div>
                        <div className="submit-btn text-center">
                            {
                                ngoList === undefined || ngoList === null ?
                                    <CircularProgress />
                                    :
                                    <select id="shortBy" name="select"
                                        onChange={((e) => { setNgoSelect(JSON.parse(e.target.value)) })}
                                        className="mb-[22px]" aria-label="Default select example">
                                        <option value="" hidden select>NGO</option>

                                        {
                                            ngoList === undefined || ngoList === [] ?
                                                <option value="" disabled>Oops Please Wait for Database...</option>
                                                :
                                                <>
                                                    {
                                                        ngoList.map((v, k) => {
                                                            return (
                                                                <option value={JSON.stringify(v)} key={k}>{v.name}</option>
                                                            )
                                                        })
                                                    }
                                                </>
                                        }
                                    </select>
                            }
                            {
                                errorMsg === undefined ? null :
                                    <div id="errorMSG"
                                        style={{
                                            marginBottom: "20px"
                                        }}
                                    >
                                        {errorMsg}
                                    </div>
                            }
                            {
                                loading === true ?
                                    <button  className="btn cursor-not-allowed bg-slate-400 w-[100%] mt-[10px]" id="waiting">Wait.....</button> :
                                    <button type="input" className="btn bg-slate-800 w-[100%]"
                                        onClick={(() => {
                                            setLoading(true)
                                            addMedicine(
                                                {
                                                    medicineName: medicineName,
                                                    description: description,
                                                    purchasedDate: purchased,
                                                    tabletCount: tablet,
                                                    expiryDate: expiry,
                                                    district: address,
                                                    sector: address2,
                                                    photo: imageValue,
                                                    ngoID: ngoSelect === undefined ? undefined : ngoSelect.id,
                                                    ngoEmail:ngoSelect === undefined ? undefined : ngoSelect.email,
                                                    ngoName: ngoSelect === undefined ? undefined : ngoSelect.name,
                                                    donorId: data.state.id,
                                                    donorName: data.state.name,
                                                },
                                                setLoading, setErrorMsg
                                            )
                                        })}
                                    >Submit</button>
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AddDonete