import BreadCrumbs from "@/components/breadcrumbs/BreadCrumbs";
import CustomTable from "@/components/customtable/CustomTable";
import CustomTypography from "@/library/typography/CustomTypography";
import SearchInput from "@/library/input/searchinput/SearchInput";
import CustomButton from "@/library/buttons/CustomButton";
import { FaArrowLeft } from "react-icons/fa";
import './Users.scss'


export default function Users() {
    return (
        <div className="adminusers">
            <BreadCrumbs />
            <div className="title">
                <FaArrowLeft />
                <CustomTypography content={"Users"} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
            </div>

            <div className="header">
                <div className="searchinput">
                    <SearchInput />
                </div>
                <div className="right">
                    <CustomButton label='Download Behaviour Report' variant='transparent' height={'42px'} />
                    <CustomButton label="Delete" variant="danger" height={'42px'} />
                    <CustomButton label="Create New" variant="primary" height={'42px'} />
                </div>
            </div>
            <CustomTable  />
        </div>
    )
}