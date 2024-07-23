import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleDarkTheme = () => {
        console.log('CLICK');
        setIsDarkTheme(!isDarkTheme);
        const body = document.querySelector('body');
        body.classList.toggle('dark-theme', !isDarkTheme);
        console.log(body);
    }
    return (
        <AppContext.Provider value={{ isDarkTheme, toggleDarkTheme }}>
            {children}
        </AppContext.Provider>
    )
}



export const useGlobalContext = () => useContext(AppContext)