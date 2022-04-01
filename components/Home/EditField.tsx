import { TrashIcon, TriangleDownIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Box } from "../Box"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRightSlot, DropdownMenuSeparator, DropdownMenuTrigger } from "../Dropdown"
import { IconButton } from "../IconButton"
import { Select } from "../Select"
import { TextField } from "../TextField"

interface iValue {
  label: string,
  contains: string
}

interface props {
  value: iValue;
  onChange?: (value: iValue) => void,
  onDelete?: (value: iValue) => void
}

export const EditField: React.FC<props> = ({
  value,
  onChange = () => { },
  onDelete = () => { }
}) => {
  const [{ label, contains }, setValue] = useState(value);
  const [isTouch, setTouch] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild={true}>
        <IconButton>
          <TriangleDownIcon />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onInteractOutside={() => {
          if (isTouch) onChange({ label, contains })
          setTouch(false);
        }}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Edit field</DropdownMenuLabel>
          <Box css={{ px: "$5" }}>
            <TextField
              value={label}
              onChange={e => {
                console.log(e.target.value);
                setValue(s => ({
                  ...s,
                  label: e.target.value
                }))
                if (!isTouch) setTouch(true);
              }}
            />
          </Box>
          <Box css={{ px: "$5", mt: "$1" }}>
            <Select
              value={contains}
              onChange={e => {
                if (!isTouch) setTouch(true);
                setValue(s => ({
                  ...s,
                  contains: e.target.value
                }))
              }}
            >
              {[
                { label: "Name", value: "name" },
                { label: "Address", value: "streetAddress" },
                { label: "Phone", value: "phoneNumber" },
                { label: "Job", value: "jobType" },
              ].map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
            </Select>
          </Box>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              onDelete({ label, contains });
            }}
          >Delete <DropdownMenuRightSlot><TrashIcon /></DropdownMenuRightSlot></DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}