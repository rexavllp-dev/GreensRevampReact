"use client";
import Footer from "@/components/footer/Footer";
import ScrollTop from "@/components/scrolltop/ScrollTop";
import './layout.scss'
import { useRouter } from "next/navigation";
import CheckoutNavbar from "@/components/navbar/checkoutnavbar/CheckoutNavbar";



export default function RootLayout({ children }) {
    const router = useRouter()
    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')

    if (!token || token == "" || token == "undefined" || token == null) {
        router.push('/')
    } else {
        return (
            <div>
                <CheckoutNavbar />
                <div className='checkout-layout-wrapper' >
                    {children}
                </div>
                <ScrollTop />
                <Footer />
            </div>
        )

    }

}