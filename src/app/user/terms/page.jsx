'use client';
import React, { useEffect } from 'react'
import CustomTypography from '@/library/typography/CustomTypography'
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { toast } from 'react-toastify';
import "./Terms.scss"

const Terms = () => {
    const dispatch = useDispatch();

    return (
        <div className="terms_section">
            <div className="header mb-3">
                <div className="flex gap-3">
                    <div className="cursor-pointer" onClick={() => router.back()}>
                        <MdKeyboardArrowLeft size={32} />
                    </div>
                    <CustomTypography content={'Terms of Use'} weight="BOLD" color="BLACK" size="SUPER-LARGE" />
                </div>
            </div>
            <div className='content'>
                <CustomTypography content='Lorem ipsum dolor sit amet consectetur. Lobortis netus tortor rutrum habitasse nibh elementum amet. Justo ultrices mattis sed mus malesuada feugiat quis sem. Ante volutpat vulputate nunc venenatis amet in. Vitae sit consectetur pulvinar egestas ipsum ut. Vestibulum tellus mi lobortis quam urna. Odio suspendisse molestie vulputate sapien tempor aliquam tellus neque mi. Risus vitae faucibus sed id. Habitasse augue varius facilisis lorem lorem. Aenean sed quam lobortis id consectetur dignissim diam. Eu amet ipsum egestas iaculis. Erat eget rhoncus nec elementum. Sed vel faucibus diam nunc ut ipsum viverra dolor semper. 

Posuere dolor ipsum pretium nullam cum tellus enim. Vitae est sollicitudin tincidunt ac luctus auctor in egestas. Fringilla mauris imperdiet sit suspendisse euismod eget nec. At tellus dignissim duis nisl mollis nibh condimentum. Adipiscing nulla tellus fermentum est. Id at tortor tortor tempor laoreet iaculis vulputate senectus dignissim. Maecenas integer consectetur quisque adipiscing. Donec neque massa sagittis massa iaculis sit orci fermentum elit. 

Elit eget mauris turpis eget mus urna erat enim ullamcorper. Ut non non iaculis dictum. Mollis erat quisque tristique viverra nisi et quis malesuada. Fermentum ut phasellus eleifend blandit egestas et. Amet sed rhoncus sit consequat nulla ante sit odio. Lectus sit bibendum sit arcu morbi. Commodo accumsan bibendum purus urna dictum eros. Sit lacus velit turpis dictumst est elit magna ultrices leo. Massa tellus nulla ut habitant egestas aliquam. Rhoncus viverra dolor nibh et ac fringilla risus enim vel. Lorem eget ornare in dapibus. Mauris sit mauris urna ac neque. Aliquet lectus vitae fringilla viverra egestas sollicitudin scelerisque. Sed nibh pellentesque aliquam et mattis. Justo tempor facilisis purus purus.

 Eget in mi convallis elementum in sed non. Turpis vestibulum viverra viverra vitae tortor aliquam nisi faucibus curabitur. Lorem fames et at sit a sapien. Enim sodales tempus nibh maecenas id quisque imperdiet id tincidunt. Gravida ut bibendum semper magna in risus mattis. Erat et blandit massa senectus mauris eget in ac. Mi porta vulputate in tellus. Bibendum eu euismod aliquam odio lectus. Viverra dis ut tellus habitasse nisl turpis eleifend risus justo. Dignissim est velit et sapien ullamcorper congue aenean vulputate. Odio nisi velit dignissim eget. Pretium vitae consequat sit massa velit maecenas in. Suspendisse sed ultricies aliquam ipsum urna nulla ac vel semper. Nec viverra pulvinar lacinia fermentum at.'
                    weight="REGULAR" color="BLACK" size="MEDIUM-SMALL" />
            </div>
        </div >
    )
}

export default Terms