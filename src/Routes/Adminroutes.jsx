import { Route, Routes } from "react-router-dom";
import Adminlogin from "../Pages/Admin/AdLogin";
import Admindash from "../Pages/Admin/Adashboard";
import UserList from "../Pages/Admin/UserList";
import PartnerRequist from "../Pages/Admin/PartnerRequist";
import Partnerlist from "../Pages/Admin/Partnerlist";
import BikeReq from "../Pages/Admin/BikeReq";
import AddCoupons from "../Pages/Admin/AddCoupons";
import AdminCharts from "../Pages/Admin/AdminCharts";
import Coupons from "../Pages/Admin/Coupons";
import Adminsales from "../Pages/Admin/Adminsales";
import Rejectlist from "../Pages/Admin/Rejectlist";
import { adminApi } from "../configure/Api";
import { addadmin } from "../redux/Adminslice";
import { useEffect, useState } from "react";
import AdminViewsBikes from "../Pages/Admin/AdminViewsBikes";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Page404notfind from "../Pages/ErrrorPages/Page404notfind";
import ServerErr from "../Pages/ErrrorPages/ServerErr";

function Adminroutes() {
  const dispatch = useDispatch();
  const [checkAdmin, setChedkAdmin] = useState();
  // Optional chaining to prevent errors
  const admin = useSelector((store) => store.admin.adminD);
  const admintoken = admin.token;

  const checkIfadmin = async (token) => {
    console.log("Checking if admin...");

    try {
      const response = await axios.post(`${adminApi}/checkifadmin`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setChedkAdmin(response.data.admindata.token);
        dispatch(
          addadmin({
            token: response.data.admindata.token,
            email: response.data.admindata.email,
          })
        );
      } else {
        console.log("Admin check failed. Response:", response.data);
      }
    } catch (error) {
      console.error("Error checking if user is an admin:", error);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    dispatch(
      addadmin({
        token: token,
      })
    );
    token && checkIfadmin(token);
  }, []);

  // Add a loading or fallback state for the initial render
  if (admintoken === undefined) {
    return <div>Loading...</div>; // or another loading indicator
  }

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Page404notfind />} />

        <Route path="/" element={admintoken ? <Admindash /> : <Adminlogin />} />
        <Route
          path="/login"
          element={admintoken ? <Admindash /> : <Adminlogin />}
        />

        <Route
          path="/user"
          element={admintoken ? <UserList /> : <Adminlogin />}
        />

        <Route
          path="/partnerreq"
          element={admintoken ? <PartnerRequist /> : <Adminlogin />}
        />

        <Route
          path="/Partnerlist"
          element={admintoken ? <Partnerlist /> : <Adminlogin />}
        />
        <Route
          path="/bikerequest"
          element={admintoken ? <BikeReq /> : <Adminlogin />}
        />

        <Route
          path="/partnerbikeslists"
          element={admintoken ? <AdminViewsBikes /> : <Adminlogin />}
        />
         <Route
          path="/coupon"
          element={admintoken ? <Coupons /> : <Adminlogin />}
        />
         <Route
          path="/addcoupon"
          element={admintoken ? <AddCoupons /> : <Adminlogin />}
        />
         <Route
          path="/adminchart"
          element={admintoken ? <AdminCharts /> : <Adminlogin />}
        />
         <Route
          path="/adminsales"
          element={admintoken ? <Adminsales /> : <Adminlogin />}
        />
         <Route
          path="/rejectlist"
          element={admintoken ? <Rejectlist /> : <Adminlogin />}
        />
        <Route path="/error404" element={<Page404notfind />} />
        <Route path="/error500" element={<ServerErr />} />
      </Routes>
     
      
    </div>
  );
}

export default Adminroutes;
