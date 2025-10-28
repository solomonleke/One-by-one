export const isActive = (history, path) => {
    let activeScreen = history.pathname == path ? true :  false
    return activeScreen;
}

export const isAuthenticated = () => {
    if (localStorage.getItem("authToken")) {
        return true;
    } else {
        return false;
    }
};

export const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("onlineUser");
};

const getUserRole = () => {
    const onlineUser = JSON.parse(localStorage.getItem("onlineUser"));
    return onlineUser ? onlineUser.role : "";
};

export const isSchoolAdmin = () => {
    const role = getUserRole();
    if (role === "SCHOOL-ADMIN") {
        return true
    } else {
        return false
    }

};
export const isScholarshipAdmin = () => {
    const role = getUserRole();
    if (role === "SCHOLARSHIP-ADMIN") {
        return true
    } else {
        return false
    }

};

export const isSponsorAdmin = () => {
    const role = getUserRole();
    if (role === "SPONSOR" || role === "SPONSOR-ADMIN") {
        return true
    } else {
        return false
    }

};
export const isFundAdmin = () => {
    const role = getUserRole();
    if (role === "FUND-ADMIN") {
        return true
    } else {
        return false
    }

};

export const isSuperAdmin = () => {
    const role = getUserRole();
    if (role === "SUPER-ADMIN") {
        return true
    } else {
        return false
    }

};
