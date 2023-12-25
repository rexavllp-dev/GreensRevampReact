"use client"
import AuthFooter from "@/components/footer/authfooter/AuthFooter";
import AuthNavbar from "@/components/navbar/authnavbar/AuthNavbar";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";


const cookies = new Cookies();
export default function Layout({ children }) {
    const router = useRouter()

    const token = cookies.get('accessToken')

    // if (token && token !== ""){
        return (
            <div>
                <AuthNavbar />
                {children}
                <AuthFooter />
            </div>
        );
    // }else {
    //     router.push('/')
    // }
}