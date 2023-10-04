import { createContext,useState} from "react";




export const WrittenContext = createContext();

export const WrittenProvider = ({children}) => {
    const [written, setWritten] = useState(false)
    return (
        <WrittenContext.Provider value={{written, setWritten}}>
        {children}
        </WrittenContext.Provider>
    )
}