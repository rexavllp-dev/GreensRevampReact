"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import './CustomTabs.scss'
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "@/services/features/userSlice";

export default function CustomTabs({ tabs }) {
  const [selected, setSelected] = React.useState("photos");


  return (
    <div className="customtabs">
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        variant="underlined"
        classNames={{
          tabList: "tablist",
          cursor: "tabcursor",
          tab: "tabchips",
        }}
      >
        {
          tabs.map((obj, i) => (
            <Tab key={obj.id} title={obj.label}>
              {
                obj.component
              }
            </Tab>
          ))
        }
      </Tabs>
    </div>
  );
}
