import {HiOutlineUsers} from "react-icons/hi"
import { isActive, isSchoolAdmin,isScholarshipAdmin, isFundAdmin } from "../Authentication/Index"
import { GoGear } from "react-icons/go"
import { RxDashboard } from "react-icons/rx"
import { IoBriefcaseOutline, IoSchoolOutline } from "react-icons/io5"
import { FaSchool } from "react-icons/fa"
import { PiStudent } from "react-icons/pi"
import { TbCurrencyNaira } from "react-icons/tb"
import { VscHistory } from "react-icons/vsc"
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

const checkVeryVeryActive= ()=>{

    let result = ""

    if (isActive(location, "/scholarship-admin/schools")){
          result = true
          return  result
      }else if (location.pathname === "/scholarship-admin/schools/school-profile"){
          result = true
          return  result
      }else{
          result = false
          return  result
      }
  
}

const checkLeaderboardActive= ()=>{

    let result = ""

    if (isActive(location, "/scholarship-admin")){
          result = true
          return  result
      }else if (location.pathname === "/scholarship-admin/scholarship-admin-leaderboard"){
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
        active: checkLeaderboardActive(),
        display: isScholarshipAdmin()
    },
    {
        name: "schools",
        icon: <IoSchoolOutline />,
        link: "/scholarship-admin/schools",
        active: checkVeryVeryActive(),
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
    {
        name: "overview",
        icon: <RxDashboard/>,
        link: "/fund-admin",
        active: isActive(location, "/fund-admin"),
        display: isFundAdmin()
    },
    {
        name: "awaiting fund",
        icon: <TbCurrencyNaira />,
        link: "/fund-admin/awaiting-fund",
        active: isActive(location, "/fund-admin/awaiting-fund"),
        display: isFundAdmin()
    },
    {
        name: "funded students",
        icon: <PiStudent />,
        link: "/fund-admin/funded-students",
        active: isActive(location, "/fund-admin/funded-students"),
        display: isFundAdmin()
    },
    {
        name: "funding history",
        icon: <VscHistory />,
        link: "/fund-admin/funding-history",
        active: isActive(location, "/fund-admin/funding-history"),
        display: isFundAdmin()
    },
    {
        name: "settings",
        icon: <GoGear/>,
        link: "/fund-admin/settings",
        active: isActive(location, "/fund-admin/funding-history"),
        display: isFundAdmin()
    },
   
    
]


console.log("isSchoolAdmin():", isSchoolAdmin());
console.log("isScholarshipAdmin():", isScholarshipAdmin());

return List
} 