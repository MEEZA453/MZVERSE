'use client'
import { ProfileProvider } from '../Context/ProfileContext'
import {ShowInputProvider} from '../Context/ShowInputContext'
export default function AllAssetsLayout ({children}:{children : React.ReactNode}){
return <ShowInputProvider>


    {children}
</ShowInputProvider>
}