"use client"
import React from "react";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/react";
import './BreadCrumbs.scss';
import { usePathname } from "next/navigation";

export default function BreadCrumbs() {
  const paths = usePathname()
  const pathNames = paths.split('/').filter(path => path)
  let capitalizeLinks = true;

  return (
    <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: "px-2",
        item: "breadcrumb-item",
      }}
    //   underline="always"
    >

      {
        pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join('/')}`
          let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
          return (
            // <React.Fragment key={index}>
            //     <li className={itemClasses} >
            //         <Link href={href}>{itemLink}</Link>
            //     </li>
            //     {pathNames.length !== index + 1 && separator}
            // </React.Fragment>
            <BreadcrumbItem key={index} href={href}>{itemLink}</BreadcrumbItem>
          )
        })
      }
    </Breadcrumbs>
  );
}
