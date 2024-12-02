export const isActive = (history, path) => {
    let activeScreen = history.pathname == path ? true :  false
    return activeScreen;
}