import { ActionIcon, Divider, Menu, MenuItem, Select, TextInput } from "@mantine/core";
import { IconChevronDown, IconTrash } from "@tabler/icons";
import { useState } from "react"

interface iValue {
  label: string,
  contains: string
}

interface props {
  value: iValue;
  onDelete?: (value: iValue) => void,
  onClose?: (value: iValue, touched: boolean) => void
}

export const EditField: React.FC<props> = ({
  value,
  onDelete = () => { },
  onClose = () => { }
}) => {
  const [values, setValues] = useState(value);
  const [isTouch, setTouch] = useState(false);

  return (
    <Menu
      onClose={() => onClose(values, isTouch)}
      control={
        <ActionIcon>
          <IconChevronDown size={16} />
        </ActionIcon>
      }>
      <Menu.Label>Edit Field</Menu.Label>
      <TextInput
        mb="xs"
        value={values.label}
        onChange={(e) => {
          setValues(s => ({ ...s, label: e.target.value }))
          if (!isTouch) setTouch(true);
        }}
      />
      <Select
        searchable
        value={values.contains}
        onChange={(value: string) => {
          setValues(s => ({ ...s, contains: value }))
          if (!isTouch) setTouch(true);
        }}
        data={[
          { label: "Name", value: "name" },
          { label: "Address", value: "streetAddress" },
          { label: "Phone", value: "phoneNumber" },
          { label: "Job", value: "jobType" },
        ]}
      />
      <Divider />
      <MenuItem
        onClick={() => onDelete(value)}
        color="red"
        icon={<IconTrash size={14} />}
      >Delete</MenuItem>
    </Menu>
  )
}