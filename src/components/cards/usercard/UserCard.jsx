'use client';
import { MdKeyboardArrowRight } from 'react-icons/md';
import './UserCard.scss';
import CustomTypography from '@/library/typography/CustomTypography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UserCard({ title, url, icon }) {
    const router = useRouter()
    return (
        <Link href={url}>
            <div className="usercard">
                <div className="header">
                    <div className="headericon">
                        {icon}
                    </div>
                    <CustomTypography content={title} weight="MEDIUM" color="BLACK" size="MEDIUM-LARGE" />
                </div>
                <div className="flex justify-end">
                    <div className="icon" >
                        <MdKeyboardArrowRight size={24} stroke='1' />
                    </div>
                </div>

                {/* <div className="footer">
                <CustomTypography content={8} size="EXTRA-LARGE" color="BLACK" weight="SEMI-    BOLD" />
            </div> */}
            </div>
        </Link>
    )
}