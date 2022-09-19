import React from "react";
import Home from "../app/pages/home";
import {Route, Routes } from 'react-router-dom'
import DashboardD from "../app/pages/donor/dashboard";
import AddDonete from "../app/pages/donor/addDonate";
import DashbordAdmin from "../app/pages/admin/dashboard";
import DashboardNgo from "../app/pages/ngo/dashbaord";
const AppRoutes = () => {
    return (
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/donate" element={<DashboardD/>}/>
          <Route exact path="/add-donate" element={<AddDonete/>}/>
          <Route exact path="/admin" element={<DashbordAdmin />} />
          <Route exact path="/ngo" element={<DashboardNgo />} />
        </Routes>
    )
}
export default AppRoutes;