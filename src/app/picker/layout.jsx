import PickerNavbar from "@/components/navbar/pickernavbar/PickerNavbar";
import PickerSidebar from "@/components/sidebar/picker_sidebar/PickerSidebar";




export default function Layout({ children }) {
    return (
        <>
            <PickerSidebar />
            <PickerNavbar />
            <div style={{ marginLeft: "260px", marginTop: "60px" }}>
                {children}
            </div>
        </>
    );
}