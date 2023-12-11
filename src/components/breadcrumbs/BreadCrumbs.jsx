import React from "react";
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";
import './BreadCrumbs.scss';

export default function BreadCrumbs() {
  return (
    <Breadcrumbs
      separator="/"
      itemClasses={{
        separator: "px-2",
        item: "breadcrumb-item",
      }}
    //   underline="always"
    >
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>Cake Decorations</BreadcrumbItem>
    </Breadcrumbs>
  );
}
