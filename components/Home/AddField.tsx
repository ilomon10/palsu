import { ActionIcon, Divider, Menu, MenuItem, Select, TextInput } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useFormik } from "formik";
import { useMemo, useState } from "react"
import { normalizeString } from "../helper";

interface iValue {
  label: string,
  contains: string
}

interface props {
  onAdd?: (value: iValue) => void
}

export const AddField: React.FC<props> = ({
  onAdd = () => { }
}) => {
  const [isTouch, setTouch] = useState(false);

  const { values, errors, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      label: "",
      contains: ""
    },
    onSubmit(values, { setSubmitting }) {
      console.log(values);
      setSubmitting(false);
    }
  });

  const name = useMemo(() => {
    return normalizeString(values.label);
  }, [values.label]);

  return (
    <Menu
      control={
        <ActionIcon>
          <IconPlus size={16} />
        </ActionIcon>
      }>
        <Menu.Label>Add new Field</Menu.Label>
      <form onSubmit={handleSubmit}>
        <TextInput
          mb="xs"
          error={errors["label"]}
          name="label"
          placeholder="Label"
          value={values.label}
          onChange={(e) => {
            setFieldValue("label", e.target.value);
          }}
        />
        <Select
          searchable
          placeholder="Contains"
          name="contains"
          value={values.contains}
          error={errors["contains"]}
          onChange={(value: string) => {
            setFieldValue("contains", value);
          }}
          data={[
            { label: "Name", value: "name" },
            { label: "Address", value: "streetAddress" },
            { label: "Phone", value: "phoneNumber" },
            { label: "Job", value: "jobType" },
          ]}
        />

        <Divider />

        <TextInput
          mb="xs"
          placeholder="Name"
          value={name}
          readOnly={true}
          variant="filled"
        />

        <MenuItem
          onClick={() => onAdd(values)}
          color="blue"
          icon={<IconPlus size={16} />}
        >Add Field</MenuItem>
      </form>
    </Menu>
  )
}