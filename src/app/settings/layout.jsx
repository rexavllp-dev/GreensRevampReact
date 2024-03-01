"use client";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/scrolltop/ScrollTop";
import { useRouter } from "next/navigation";
import './layout.scss'
import SettingsNavbar from "@/components/navbar/settingsnavbar/SettingsNavbar";

export default function RootLayout({ children }) {
    const router = useRouter()
    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    if (!token || token == "" || token == "undefined" || token == null) {
        typeof window !== "undefined" && router.push('/');
        return null; 
    } else {
        return (
            <div>
                <SettingsNavbar />
                <div className='checkout-layout-wrapper' >
                    {children}
                </div>
                <ScrollTop />
                <Footer />
            </div>
        )
    }
}