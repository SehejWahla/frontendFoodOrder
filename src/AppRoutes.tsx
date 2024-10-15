import {Routes, Route, Navigate} from "react-router-dom"
import { Button } from "@/components/ui/button"

const AppRoutes = ()=>{
    return (
        <Routes>
            <Route path="/" element={<Button variant="destructive">Click me</Button>}/>
            <Route path="/user-profile" element={<span>User Profile Page</span>}/>
            <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
    )
}

export default AppRoutes