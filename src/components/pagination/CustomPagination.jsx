import React from "react";
import {Pagination} from "@nextui-org/react";

export default function CustomPagination() {
  return (
    <Pagination showControls total={10} initialPage={1} />
  );
}
