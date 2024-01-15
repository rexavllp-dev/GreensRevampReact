'use client';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './AdminCard.scss';
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';

export default function AdminCard({ title, url }) {
    const router = useRouter()
    return (
        <div className="admincard" onClick={() => router.push(url)}>
            <div className="header">
                <CustomTypography content={title} weight="MEDIUM" color="BLACK" size="MEDIUM-LARGE" />
                <div className="icon" >
                    <MdKeyboardArrowRight size={24} stroke='1' />
                </div>
            </div>
            <div className="footer">
                <CustomTypography content={8} size="EXTRA-LARGE" color="BLACK" weight="SEMI-    BOLD" />
                <div className="btn">
                    {/* <CustomTypography content="Create" weight="MEDIUM" color="BLACK" size="MEDIUM" /> */}
                </div>
            </div>
        </div>
    )
}