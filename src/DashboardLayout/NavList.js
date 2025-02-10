import {HiOutlineUsers} from "react-icons/hi"
import { isActive, isSchoolAdmin, isScholarshipAdmin, isSponsorAdmin } from "../Authentication/Index"
import { GoGear } from "react-icons/go"
import { RxDashboard } from "react-icons/rx"
import { ReactComponent as Scholarship } from "../Asset/scholarship.svg"
import { IoBriefcaseOutline, IoSchoolOutline } from "react-icons/io5"
import { FaSchool } from "react-icons/fa"
import { PiStudent } from "react-icons/pi"
import { BiHistory } from "react-icons/bi"
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
        icon: <RxDashboard />,
        link: "/sponsor-admin",
        active: isActive(location, "/sponsor-admin"),
        display: isSponsorAdmin()
    },
    {
        name: "my scholarships",
        icon: <Scholarship />,
        link: "/sponsor-admin/myscholarships",
        active: isActive(location, "/sponsor-admin/myscholarships"),
        display: isSponsorAdmin()
    },
    {
        name: "discover students",
        icon: <PiStudent />,
        link: "/sponsor-admin/discoverstudents",
        active: isActive(location, "/sponsor-admin/discoverstudents"),
        display: isSponsorAdmin()
    },
    {
        name: "funding history",
        icon: <BiHistory />,
        link: "/sponsor-admin/fundinghistory",
        active: isActive(location, "/sponsor-admin/fundinghistory"),
        display: isSponsorAdmin()
    },
    {
        name: "settings",
        icon: <GoGear />,
        link: "/sponsor-admin/settings",
        active: isActive(location, "/sponsor-admin/settings"),
        display: isSponsorAdmin()
    },
   
    
]

return List
} 