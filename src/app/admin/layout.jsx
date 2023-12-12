import AdminNavbar from "@/components/navbar/adminnavbar/AdminNavbar";
import AdminSidebar from "@/components/sidebar/admin_sidebar/AdminSidebar";




export default function Layout({ children }) {
    return (
        <>
            <AdminSidebar />
            <AdminNavbar />
            <div style={{ marginLeft: "260px", marginTop: "60px" }}>
                {children}
            </div>
        </>
    );
}