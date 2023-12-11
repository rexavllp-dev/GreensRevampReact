import AuthFooter from "@/components/footer/authfooter/AuthFooter";
import AuthNavbar from "@/components/navbar/authnavbar/AuthNavbar";



export default function Layout({ children }) {
    return (
        <div >
            <AuthNavbar />
            {children}
            <AuthFooter />
        </div>
    );
}