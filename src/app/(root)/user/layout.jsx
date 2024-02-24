
import './layout.scss'
import UserSidebar from "@/components/sidebar/user_sidebar/UserSidebar";



export default function RootLayout({ children }) {

    return (
        <div className="flex">
            <UserSidebar />
            {children}
        </div>
    )
}
