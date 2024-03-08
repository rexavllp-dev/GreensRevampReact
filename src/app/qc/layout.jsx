import QcNavbar from "@/components/navbar/qcnavbar/QcNavbar";
import QcSidebar from "@/components/sidebar/qc_sidebar/QcSidebar";




export default function Layout({ children }) {
    return (
        <>
            <QcSidebar />
            <QcNavbar />
            <div style={{ marginLeft: "260px", marginTop: "60px" }}>
                {children}
            </div>
        </>
    );
}