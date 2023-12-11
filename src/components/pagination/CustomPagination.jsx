import React from "react";
import { Pagination } from "@nextui-org/react";
import './CustomPagination.scss'

export default function CustomPagination() {
  return (
    <Pagination
      classNames={{
        cursor: "pagination-item",
      }}
      showControls total={10} initialPage={1} />
  );
}
