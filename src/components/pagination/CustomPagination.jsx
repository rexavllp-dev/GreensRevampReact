import React from "react";
import { Pagination } from "@nextui-org/react";
import './CustomPagination.scss'

export default function CustomPagination({ currentPage, setCurrentPage, totalPages }) {
  return (
    <Pagination
      classNames={{
        cursor: "pagination-item",
      }}
      showControls
      total={parseInt(totalPages) || 1}
      initialPage={1}
      page={parseInt(currentPage) || 1}
      onChange={setCurrentPage}
    />
  );
}
