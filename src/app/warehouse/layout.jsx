import WarehouseNavbar from "@/components/navbar/warehousenavbar/WarehouseNavbar";
import WarehouseSidebar from "@/components/sidebar/warehouse_sidebar/WarehouseSidebar";




export default function Layout({ children }) {
    return (
        <>
            <WarehouseSidebar />
            <WarehouseNavbar />
            <div style={{ marginLeft: "260px", marginTop: "60px" }}>
                {children}
            </div>
        </>
    );
}