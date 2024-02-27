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
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    if (token && token !== "" && token !== "undefined") {
        typeof window !== "undefined" && router.push('/');
        return null;
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