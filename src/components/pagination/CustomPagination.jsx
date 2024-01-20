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
      total={totalPages}
      initialPage={1}
      page={currentPage}
      onChange={setCurrentPage}
    />
  );
}
