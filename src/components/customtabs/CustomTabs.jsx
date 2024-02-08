"use client";
import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import './CustomTabs.scss'
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "@/services/features/userSlice";

export default function CustomTabs({ tabs, id, isAdvanced, isProductTable }) {
  const [selected, setSelected] = React.useState("photos");
  const [disabledKeys, setDisabledKeys] = React.useState([]);

  React.useEffect(() => {
    if (!id) {
      if (isProductTable) {
        if (isAdvanced) {
          setDisabledKeys(['1', '2', '3', '4', '5', '6', '7']);
        } else {
          setDisabledKeys(['2', '3', '4', '5', '6', '7']);
        }
      } else {
        setDisabledKeys([]);
      }
    } else {
      setDisabledKeys([]);
    }
  }, [id])



  return (
    <div className="customtabs">
      <Tabs
        aria-label="Options"
        disabledKeys={disabledKeys}
        selectedKey={selected}
        onSelectionChange={setSelected}
        // variant="underlined"
        classNames={{
          // tabList: "tablist",
          // cursor: "tabcursor",
          // tab: "tabchips",
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
