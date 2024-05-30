import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldProps } from "formik";

import { createNewUsage } from "src/api";
import { useUsage } from "src/UsageContext";
import { Unit } from "../types";
import { getDisplayString, toaster } from "src/utils";
import "../sass/_newUsage.scss";

const NewUsage = () => {
  const { refreshUsages } = useUsage();
  const initialValues = {
    quantity: 0,
    unit: Unit.KILO_WATT_HOURS,
  };
  return (
    <Paper className="NewUsageContainer" elevation={3}>
      <Formik
        key="usage-form"
        initialValues={initialValues}
        onSubmit={async (values) => {
          await createNewUsage(values)
            .then((data) => {
              toaster("New Usage Successfully Created", true);
              refreshUsages();
            })
            .catch(() => toaster("Could not create a new usage", false));
        }}
      >
        <Form>
          <Typography mb={3}>Create a new Usage Point</Typography>
          <Field name="quantity">
            {(props: FieldProps) => {
              return (
                <TextField
                  sx={{ marginRight: 3 }}
                  size="small"
                  variant="outlined"
                  label="Quantity"
                  {...props.field}
                  placeholder="Quantity"
                />
              );
            }}
          </Field>
          <Field name="unit">
            {(props: FieldProps) => {
              return (
                <FormControl>
                  <InputLabel id="unit-label">Unit</InputLabel>
                  <Select
                    sx={{ marginRight: 3 }}
                    size="small"
                    labelId="unit-label"
                    value={props.field.value}
                    onChange={(e) => {
                      props.form.setFieldValue("unit", e.target.value);
                    }}
                  >
                    {Object.values(Unit).map((unit) => {
                      return (
                        <MenuItem key={unit} value={unit}>
                          {getDisplayString(unit)}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              );
            }}
          </Field>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </Paper>
  );
};

export default NewUsage;
