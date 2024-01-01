"use client"
import AuthFooter from "@/components/footer/authfooter/AuthFooter";
import AuthNavbar from "@/components/navbar/authnavbar/AuthNavbar";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import './layout.scss'


const cookies = new Cookies();
export default function Layout({ children }) {
    const router = useRouter()

    // const token = cookies.get('accessToken')
    const token = localStorage && localStorage.getItem('accessToken')

    if (token && token !== "" && token !== "undefined") {
        router.push('/')
    } else {
    return (
        <div className="auth-layout">
            <AuthNavbar />
            {children}
            <AuthFooter />
        </div>
    );
    }
}