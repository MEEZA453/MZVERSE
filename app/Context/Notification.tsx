'use client'
import {createContext , useState , useContext , ReactNode} from 'react'

type showNotificationType = {
    notification : string;
    setNotification : React.Dispatch<React.SetStateAction<string>>;
};
const NotificationContext = createContext<showNotificationType | undefined>(undefined);
export const NotificationProvider : React.FC<{children:ReactNode}> = ({children}) =>{
    const [notification , setNotification ] = useState('');
    return (
        <NotificationContext.Provider value={{notification , setNotification}}
        >{children}</NotificationContext.Provider>
    )
}

export const useNotification = ()=> useContext(NotificationContext)