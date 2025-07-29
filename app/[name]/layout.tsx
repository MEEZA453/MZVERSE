'use client'
import {ShowInputProvider} from '../Context/ShowInputContext'
import { AllAssetsProvider } from '../Context/AllAssetsContext'
export default function AllAssetsLayout ({children}:{children : React.ReactNode}){
return <AllAssetsProvider>
 <ShowInputProvider>
    {children}
</ShowInputProvider>
</AllAssetsProvider>
}


