'use client'
import {createContext , useContext , useState , ReactNode} from 'react' 
type ShowInputContextType = {
    showInput : boolean;
    setShowInput : React.Dispatch<React.SetStateAction<boolean>>;
};
const ShowInputContext = createContext<ShowInputContextType | undefined>(undefined);
export const ShowInputProvider = (({children} : {children : ReactNode})=>{
    const [showInput , setShowInput] = useState(false)
    return <ShowInputContext.Provider value={{showInput , setShowInput}}>
        {children}
    </ShowInputContext.Provider>
})
export const useShowInput = ()=> useContext(ShowInputContext)