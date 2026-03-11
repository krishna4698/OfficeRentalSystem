import CompanyNavbar from "./src/components/CompanyNavbar";
import { Outlet } from "react-router-dom";


export function Layout({children}){
     return (

        <>
        <header>  
            <CompanyNavbar/>
        </header>
          
    {children}

        </>
     )
}