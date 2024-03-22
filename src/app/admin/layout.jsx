"use client";
import AdminNavbar from "@/components/navbar/adminnavbar/AdminNavbar";
import AdminSidebar from "@/components/sidebar/admin_sidebar/AdminSidebar";
import { usePathname, useRouter } from "next/navigation";




export default function Layout({ children }) {
    const pathname = usePathname();
    const router = useRouter();

    const allowedRoles = [7, 1];

    // const token = cookies.get('accessToken')
    const token = typeof window !== "undefined" && window.localStorage.getItem('accessToken')
    const user = typeof window !== "undefined" && window.localStorage.getItem('user') && (window.localStorage.getItem('user') !== 'undefined') && JSON.parse(window.localStorage.getItem('user'));
    const role = user?.is_role;

    if (token && token !== "" && token !== "undefined") {
        // if (!role) {
        //     console.log(user)
        //     console.log(token)
        //     console.log("role not found")
        //     typeof window !== "undefined" && router.push('/');
        //     return null;
        // } else if (!allowedRoles.includes(role)) {
        //     console.log("role not allowed")
        //     typeof window !== "undefined" && router.push('/');
        //     return null;
        // }else {
        return (
            <>
                <AdminSidebar />
                <AdminNavbar />
                <div style={{ marginLeft: "260px", marginTop: "60px" }}>
                    {children}
                </div>
            </>
        );
        // }

    } else {
        typeof window !== "undefined" && router.push('/admin/login');
        return null;

    }
}