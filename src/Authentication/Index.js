export const isActive = (history, path) => {
    let activeScreen = history.pathname == path ? true :  false
    return activeScreen;
}

const {role} =  JSON.parse(localStorage.getItem("onlineUser"))||"";

export const isAuthenticated = () => {
    if (localStorage.getItem("authToken")) {
        return true;
    } else {
        return false;
    }
};



export const isSchoolAdmin = () => {
   
    if (role === "SCHOOL-ADMIN") {
        return true
    } else {
        return false
    }

};
export const isScholarshipAdmin = () => {
   
    if (role === "SCHOLARSHIP-ADMIN") {
        return true
    } else {
        return false
    }

};

export const isSponsorAdmin = () => {
   
    if (role === "SPONSOR") {
        return true
    } else {
        return false
    }

};
export const isFundAdmin = () => {
   
    if (role === "FUND-ADMIN") {
        return true
    } else {
        return false
    }

};