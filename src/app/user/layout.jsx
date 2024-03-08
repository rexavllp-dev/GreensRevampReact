"use client";
import UserSidebar from "@/components/sidebar/user_sidebar/UserSidebar";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ScrollTop from "@/components/scrolltop/ScrollTop";
import { useRouter } from "next/navigation";
import './layout.scss';



export default function RootLayout({ children }) {
    const router = useRouter()

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    if (token && token !== "" && token !== "undefined") {
        return (
            <div>
                <Navbar />
                <div className='main-wrapper flex' >
                    <UserSidebar />
                    {children}
                </div>
                <ScrollTop />
                <Footer />
            </div>
        )
    } else {
        typeof window !== "undefined" && router.push('/');
        return null;
    }
}
