import { db } from "../db/firebase.config"
import {addDoc,collection,query,getDocs,where,} from 'firebase/firestore'
import cogoToast from 'cogo-toast';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const storage = getStorage();
// import { ref, uploadBytes , getStorage , getDownloadURL} from "firebase/storage";
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const signupDonor = async  (data,setLoading,setErrorMsg,setWhichOne) =>{
    const donorCollectionRef = collection(db,"donors")
    setErrorMsg(undefined)  
    if(data.name === undefined || data.name === ""){
        setLoading(false)  
        setErrorMsg("Check Your Name")
    }else if(data.email === undefined || data.email === ""  || !data.email.match(mailformat) ){
        setLoading(false)  
        setErrorMsg("Check Your Email")
    }else if(data.phone === undefined || data.phone === ""){
        setLoading(false)  
        setErrorMsg("Check Your Phone Number")
    }else if(data.district === undefined || data.district === "" || data.sector === "" || data.sector === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Both District And Sector")
    }else if(data.gender === "" || data.gender === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Gender")
    }else if(data.password !==  data.rePassword || data.password === "" ){
        setLoading(false)  
        setErrorMsg("Check Your Both Passwords")
    }
    else{
        const phoneValidtion = query(collection(db, "donors"), where("phone", "==", data.phone));
        const phoneSelect = await getDocs(phoneValidtion);
        if(phoneSelect.docs.length !== 0){
            setLoading(false)  
            setErrorMsg("This Phone Number Is Taken") 
        }else{
        addDoc(donorCollectionRef,data)
        setLoading(false)
        cogoToast.success("Successfully Done, Please Login")
        setWhichOne(0)
        }
    }
}

export const loginDonor = async (data,setLoading,setErrorMsg,to) =>{
    const donorCollectionRef = collection(db,"donors")
    setErrorMsg(undefined) 
    if(data.phone === undefined || data.phone === ""){
        setLoading(false)  
        setErrorMsg("Check Your Phone Number")
    }else if(data.password === "" || data.password === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Both Passwords")
    }else{
        const phoneValidtion = query(donorCollectionRef, where("phone", "==", data.phone));
        const phoneSelect = await getDocs(phoneValidtion);
        const passwordValidtion = query(donorCollectionRef, where("password", "==", data.password));
        const passwordSelect = await getDocs(passwordValidtion);
         if(phoneSelect.docs.length === 0 || passwordSelect.docs.length === 0){
            setLoading(false)  
            setErrorMsg("Wrong Credentials , Check Your Credentials")
        }else{
        setLoading(false)  
        let res;
        res = passwordSelect.docs.map((doc)=>({...doc.data(),id:doc.id}))
        to('/donate',{state:res[0]})
        }
    }
}
export const signupNgo = async  (data,setLoading,setErrorMsg,setWhichOne) =>{
    const donorCollectionRef = collection(db,"ngo")
    setErrorMsg(undefined)  
    if(data.name === undefined || data.name === ""){
        setLoading(false)  
        setErrorMsg("Check Your Name")
    }else if(data.email === undefined || data.email === ""  || !data.email.match(mailformat) ){
        setLoading(false)  
        setErrorMsg("Check Your Email")
    }else if(data.district === undefined || data.district === "" || data.sector === "" || data.sector === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Both District And Sector")
    }else if(data.password !==  data.rePassword || data.password === "" ){
        setLoading(false)  
        setErrorMsg("Check Your Both Passwords")
    }
    else{
        const emailValidtion = query(collection(db, "ngo"), where("email", "==", data.email));
        const emailSelect = await getDocs(emailValidtion);
        if(emailSelect.docs.length !== 0){
            setLoading(false)  
            setErrorMsg("This Email Is Taken") 
        }else{
        addDoc(donorCollectionRef,data)
        setLoading(false)
        cogoToast.success("Successfully Done, You will receive Email")
        setWhichOne(0)
        }
    }
}
export const loginNgo = async (data,setLoading,setErrorMsg,to,handleClickOpenDtwo) =>{
    const donorCollectionRef = collection(db,"ngo")
    setErrorMsg(undefined) 
    if(data.email === undefined || data.email === ""){
        setLoading(false)  
        setErrorMsg("Check Your Email")
    }else if(data.password === "" || data.password === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Both Passwords")
    }else{
        const phoneValidtion = query(donorCollectionRef, where("email", "==", data.email));
        const phoneSelect = await getDocs(phoneValidtion);
        const passwordValidtion = query(donorCollectionRef, where("password", "==", data.password));
        const passwordSelect = await getDocs(passwordValidtion);
         if(phoneSelect.docs.length === 0 || passwordSelect.docs.length === 0){
            setLoading(false)  
            setErrorMsg("Wrong Credentials , Check Your Credentials")
        }else{
        setLoading(false)  
        let res;
        res = passwordSelect.docs.map((doc)=>({...doc.data(),id:doc.id}))
        if(res[0].isActive === false){
            handleClickOpenDtwo()    
        }else{
            to('/ngo',{state:res[0]})
        }
        }
    }
}
export const loginAdmin = (data,setLoading,setErrorMsg,to) =>{
    setErrorMsg(undefined) 
    if(data.email === undefined || data.email === ""){
        setLoading(false)  
        setErrorMsg("Check Your Email")
    }else if(data.password === "" || data.password === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Both Passwords")
    }else{
        if(data.email === "admin" && data.password === "admin"){
            setLoading(false) 
            to("/admin") 
        }else{
            setLoading(false)  
            setErrorMsg("Wrong Credentials , Check Your Credentials")
        }
    }
}
export const addMedicine = async (data,setLoading,setErrorMsg) => {
    const medicenCollectionRef = collection(db,"medicine")
    setErrorMsg(undefined)
    if(data.medicineName === "" || data.medicineName === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Medicine Name")
    }else if(data.description === "" || data.description === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Description")
    }else if(data.purchasedDate === "" || data.purchasedDate === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Purchased Date")
    }else if(data.tabletCount === "" || data.tabletCount === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Tablet Count")
    }else if(data.district === "" || data.district === undefined){
        setLoading(false)  
        setErrorMsg("Check Your District")
    }else if(data.sector === "" || data.sector === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Sector")
    }else if(data.ngoID === "" || data.ngoID === undefined){
        setLoading(false)  
        setErrorMsg("Check Your Select Your Ngo")
    }else if(data.donorId === "" || data.donorId === undefined){
        setLoading(false)  
        setErrorMsg("Try To Start Again or Reload The Page ")
    }else if(data.photo === "" || data.photo === undefined || data.photo.length === 0 ){
        setLoading(false)  
        setErrorMsg("Add Some Picture")
    }
    else{
        const metadata = {
            contentType: 'image/jpeg'
          };
          const storageRef = ref(storage, 'images/' + data.photo[0].name);
          const uploadTask = uploadBytesResumable(storageRef, data.photo[0], metadata);
          uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                }
            }, 
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                  case 'storage/unauthorized':
                    setLoading(false) 
                    setErrorMsg("User doesn't have permission to access the object")
                    break;
                  case 'storage/canceled':
                    setLoading(false) 
                    setErrorMsg("User canceled the upload")
                    break;
                  case 'storage/unknown':
                    setLoading(false) 
                    setErrorMsg("Unknown error occurred, inspect error.serverResponse")
                    break;
                }
              }, 
               () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    data.photo = downloadURL
                    addDoc(medicenCollectionRef,data)
                    setLoading(false)
                    cogoToast.success("Successfully Sent")
                    // window.location.reload()
                });
              }
            );
    }
}