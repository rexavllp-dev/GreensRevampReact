import React from "react";
import { IoMdShareAlt } from "react-icons/io";
import { FaRegCopy } from "react-icons/fa6";
import "./CustomShare.scss"
import { FaFacebook, FaInstagram, FaPinterest, FaWhatsapp } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { toast } from "react-toastify";



const CustomShare = () => {

    const [open, setOpen] = React.useState(false)
    // Get the current URL
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    const copyText = () => {
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                toast.success('URL copied to clipboard!');
            })
            .catch((error) => {
                console.error('Error copying URL to clipboard: ', error);
            });
    };

    const shareWtsp = () => {
        const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent('Product')}%20${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    };

    const shareFb = () => {
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    };

    const shareInsta = () => {
        const shareUrl = `https://www.instagram.com/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    };
    
    const sharePinterest = () => {
        const shareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}`;
        window.open(shareUrl, '_blank');
    };

    return (
        <div className="customshare" tabIndex={1} onBlur={() => {
            setOpen(false);
        }}>
            <div className="btn" onClick={() => {
                setOpen(!open);
            }}>
                <IoShareSocialOutline size={20} color="#CC670A" />
            </div>
            {
                open &&
                <div className="dropdown">
                    <FaRegCopy size={16} color="#CC670A" className="cursor-pointer" onClick={() => copyText()} />
                    <FaWhatsapp size={16} color="#CC670A" className="cursor-pointer" onClick={() => shareWtsp()} />
                    <FaInstagram  size={16} color="#CC670A" className="cursor-pointer" onClick={() => shareInsta()} />
                    <FaPinterest  size={16} color="#CC670A" className="cursor-pointer" onClick={() => sharePinterest()} />
                    <FaFacebook size={16} color="#CC670A" className="cursor-pointer" onClick={() => shareFb()} />
                </div>
            }

        </div>
    )
}

export default CustomShare