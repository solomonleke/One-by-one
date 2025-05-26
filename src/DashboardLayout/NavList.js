import {HiOutlineUsers} from "react-icons/hi"
import { isActive, isSchoolAdmin,isScholarshipAdmin, isSponsorAdmin, isFundAdmin, isSuperAdmin } from "../Authentication/Index"
import { GoGear, GoReport } from "react-icons/go"
import { ReactComponent as Scholarship } from "../Asset/scholarship.svg";
import { RxDashboard } from "react-icons/rx"
import { IoBriefcaseOutline, IoSchoolOutline } from "react-icons/io5"
import { FaSchool } from "react-icons/fa"
import { PiStudent, PiUser } from "react-icons/pi"
import { BiHistory, BiUser } from "react-icons/bi"
import { TbCurrencyNaira } from "react-icons/tb"
import { VscHistory } from "react-icons/vsc"
export const NavList =(location)=>{



const checkActive= ()=>{

    let result = ""

    if (isActive(location, "/school-admin/student-management")){
          result = true
          return  result
      }else if (location.pathname === "/school-admin/student-management/student-profile/:student_Id"){
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
        link: "/fund-admin/awaiting-funding",
        active: isActive(location, "/fund-admin/awaiting-funding"),
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
    {
        name: "dashboard",
        icon: <RxDashboard/>,
        link: "/super-admin",
        active: isActive(location, "/super-admin"),
        display: isSuperAdmin()
    },
    {
        name: "schools",
        icon: <IoSchoolOutline/>,
        link: "/super-admin-schools",
        active: isActive(location, "/super-admin-schools"),
        display: isSuperAdmin()
    },
    {
        name: "students",
        icon: <PiStudent/>,
        link: "/super-admin-students",
        active: isActive(location, "/super-admin-students"),
        display: isSuperAdmin()
    },
    {
        name: "scholarships",
        icon: <Scholarship/>,
        link: "/super-admin-scholarships",
        active: isActive(location, "/super-admin-scholarships"),
        display: isSuperAdmin()
    },
    {
        name: "user management",
        icon: <PiUser/>,
        link: "/super-admin-user-management",
        active: isActive(location, "/super-admin-user-management"),
        display: isSuperAdmin()
    },
    {
        name: "reports & analytics",
        icon: <GoReport/>,
        link: "/super-admin-reports",
        active: isActive(location, "/super-admin-reports"),
        display: isSuperAdmin()
    },
    {
        name: "settings",
        icon: <GoGear/>,
        link: "/super-admin-settings",
        active: isActive(location, "/super-admin-settings"),
        display: isSuperAdmin()
    },
   
    
]


console.log("isSchoolAdmin():", isSchoolAdmin());
console.log("isScholarshipAdmin():", isScholarshipAdmin());

return List
} 