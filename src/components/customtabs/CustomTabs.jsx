"use client";
import React from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import CustomInput from "@/library/input/custominput/CustomInput";
import CustomPhoneInput from "@/library/input/phoneinput/CustomPhoneInput";
import './CustomTabs.scss'
import CustomToggleButton from "@/library/buttons/togglebutton/CustomToggleButton";
import CustomTextarea from "@/library/textarea/CustomTextarea";
import CustomTypography from "@/library/typography/CustomTypography";
import CustomButton from "@/library/buttons/CustomButton";
import CustomSelect from "@/library/select/custom-select/CustomSelect";
import Accounts from "@/app/admin/advanced/users/tabs/account/Accounts";

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
