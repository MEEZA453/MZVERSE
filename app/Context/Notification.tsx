'use client'
import {createContext , useState , useContext , ReactNode} from 'react'

type showNotificationType = {
    notification : string;
    
    isNotification : boolean;
    isNotiPage : boolean ;
    setNotiPage : React.Dispatch<React.SetStateAction<boolean>>
    setIsNotification : React.Dispatch<React.SetStateAction<Boolean>>
    setNotification : React.Dispatch<React.SetStateAction<string>>;
};
const NotificationContext = createContext<showNotificationType | undefined>(undefined);
export const NotificationProvider : React.FC<{children:ReactNode}> = ({children}) =>{
    const [notification , setNotification ] = useState('');
    const [isNotification , setIsNotification]  = useState(false)
    const [isNotiPage , setNotiPage ] = useState(false)
    return (
        <NotificationContext.Provider value={{ isNotification , isNotiPage , setNotiPage ,  setIsNotification , notification , setNotification}}
        >{children}</NotificationContext.Provider>
    )
}

export const useNotification = ()=> useContext(NotificationContext)