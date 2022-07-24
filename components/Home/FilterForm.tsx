import { Button, NumberInput, TextInput } from "@mantine/core";
import { Formik, FormikHelpers } from "formik";
import { Flex } from "../Flex";

interface Values {
  limit: number | undefined;
  seed: string;
}

export const FilterForm = ({
  values,
  onSubmit,
}: {
  values: Values;
  onSubmit: (values: Values) => void;
}) => {
  return (
    <Formik<Values>
      initialValues={{
        limit: values.limit,
        seed: values.seed,
      }}
      onSubmit={function (
        values: Values,
        formikHelpers: FormikHelpers<Values>
      ): void | Promise<any> {
        console.log("SUBMIT");
        onSubmit(values);
      }}
    >
      {({ values, setFieldValue, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Flex align="end" wrap="wrap">
            <NumberInput
              name="limit"
              mr="xs"
              label="Rows"
              type="number"
              value={values.limit}
              max={1000}
              onChange={(value: number) => {
                if (value > 1000) value = 1000;
                setFieldValue("limit", value || "");
              }}
            />
            <TextInput
              mr="xs"
              name="seed"
              label="Seed"
              value={values.seed}
              onChange={(e) => setFieldValue("seed", e.target.value || "")}
            />
            <Button type="submit">Generate</Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};
