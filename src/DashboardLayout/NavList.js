import {HiOutlineUsers} from "react-icons/hi"
import { isActive, isSchoolAdmin,isScholarshipAdmin } from "../Authentication/Index"
import { GoGear } from "react-icons/go"
import { RxDashboard } from "react-icons/rx"
import { IoBriefcaseOutline, IoSchoolOutline } from "react-icons/io5"
import { FaSchool } from "react-icons/fa"
import { PiStudent } from "react-icons/pi"
export const NavList =(location)=>{



const checkActive= ()=>{

    let result = ""

    if (isActive(location, "/school-admin/student-management")){
          result = true
          return  result
      }else if (location.pathname === "/school-admin/student-management/student-profile"){
          result = true
          return  result
      }else{
          result = false
          return  result
      }
  
}

const checkVeryActive= ()=>{

    let result = ""

    if (isActive(location, "/scholarship-admin/students")){
          result = true
          return  result
      }else if (location.pathname === "/scholarship-admin/students/student-profile"){
          result = true
          return  result
      }else{
          result = false
          return  result
      }
  
}
  
    
     let List = [
    
  
    {
        name: "overview",
        icon: <RxDashboard/>,
        link: "/school-admin",
        active: isActive(location, "/school-admin"),
        display: isSchoolAdmin()
    },
    
    {
        name: "student management",
        icon: <HiOutlineUsers/>,
        link: "/school-admin/student-management",
        active: checkActive() ,
        display: isSchoolAdmin()
    },
    {
        name: "school profile",
        icon: <IoBriefcaseOutline/>,
        link: "/school-admin/school-profile",
        active: isActive(location, "/school-admin/school-profile"),
        display: isSchoolAdmin()
    },
    {
        name: "settings",
        icon: <GoGear />,
        link: "/school-admin/settings",
        active: isActive(location, "/school-admin/settings"),
        display: isSchoolAdmin()
    },
    {
        name: "overview",
        icon: <RxDashboard/>,
        link: "/scholarship-admin",
        active: isActive(location, "/scholarship-admin"),
        display: isScholarshipAdmin()
    },
    {
        name: "schools",
        icon: <IoSchoolOutline />,
        link: "/scholarship-admin/schools",
        active: isActive(location, "/scholarship-admin/schools"),
        display: isScholarshipAdmin()
    },
    {
        name: "students",
        icon: <PiStudent />,
        link: "/scholarship-admin/students",
        active: checkVeryActive(),
        display: isScholarshipAdmin()
    },
    {
        name: "settings",
        icon: <GoGear />,
        link: "/scholarship-admin/settings",
        active: isActive(location, "/scholarship-admin/settings"),
        display: isScholarshipAdmin()
    },
   
    
]

return List
} 