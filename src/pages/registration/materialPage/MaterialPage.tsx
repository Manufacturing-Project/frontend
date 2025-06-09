import React, { useEffect, useRef } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik, Form, useFormikContext } from "formik";

import {
  useCreateMaterialMutation,
  useLazyCheckMaterialCodeAvailabilityQuery,
  useLazyGenerateMaterialCodeQuery,
} from "../../../features/rawMaterials/rawMaterialApiSlice";

import {
  setMName,
  setMCode,
  setCategory,
  setUnit,
  setReorderLevel,
  setDescription,
  setHasVariants,
  setRawMaterialData,
} from "../../../features/rawMaterials/rawMaterialSlice";

import { useGetUnitsQuery } from "../../../features/units/UnitsApiSlice";
import { useGetCategoriesQuery } from "../../../features/categories/CategoryApiSlice";

import { CreateRawMaterial } from "../../../features/rawMaterials/rawMaterialModel";
import { CreateUnit } from "../../../features/units/UnitModel";

import theme from "../../../components/theme";
import Toaster, { ToasterRef } from "../../../components/molecules/toaster/Toaster";

import {
  InputTextField,
  InputTextArea,
  InputSelectField,
} from "../../../components/molecules";
import { rawMaterialValidationSchema } from "../../../utils/forms/validationSchemas/materialRegistration/ValidationSchema";
import { rawMaterialInitialValues } from "../../../utils/forms/initialStatus/materialRegistration/FormInitialStatus";

interface VariantsForMaterialPageProps {
  onNext: () => void;
}

const AutoCodeEffects: React.FC<{
  materialName: string;
  materialCode: string;
  setFieldValue: (field: string, value: any) => void;
}> = ({ materialName, materialCode, setFieldValue }) => {
  const [triggerGenerateCode, { data }] = useLazyGenerateMaterialCodeQuery();
  const [triggerCheckCode] = useLazyCheckMaterialCodeAvailabilityQuery();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (materialName) triggerGenerateCode(materialName);
    }, 500);
    return () => clearTimeout(timer);
  }, [materialName]);

  useEffect(() => {
    if (data) {
      setFieldValue("m_code", data.materialCode);
    }
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (materialCode) triggerCheckCode(materialCode);
    }, 500);
    return () => clearTimeout(timer);
  }, [materialCode]);

  return null;
};

const AutoSubmitEffect: React.FC = () => {
  const { isValid, submitForm } = useFormikContext();
  useEffect(() => {
    if (isValid) {
      submitForm();
    }
  }, [isValid]);
  return null;
};

const MaterialPage: React.FC<VariantsForMaterialPageProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const toasterRef = useRef<ToasterRef>(null);

  const { data: units } = useGetUnitsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const unitOptions =
    units?.map((unit: CreateUnit) => ({
      id: unit._id,
      name: unit.unitName,
    })) || [];

  const categoryOptions =
    categories?.map((category: any) => ({
      id: category._id,
      name: category.name,
    })) || [];

  const [createMaterial] = useCreateMaterialMutation();

  return (
    <Formik
      initialValues={rawMaterialInitialValues}
      validationSchema={rawMaterialValidationSchema}
      onSubmit={async (values, {  }) => {
        
        try {

        dispatch(setRawMaterialData({
  m_name: values.m_name,
  m_code: values.m_code,
  category: values.m_status,
  unit: values.m_unit,
  reorderlevel: Number(values.m_reorderLevel),
  description: values.m_description,
  hasVariants: values.hasVariants,
}));


         
        } catch (error) {
          toasterRef.current?.showToast("Failed to create material.", "error");
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          <AutoCodeEffects
            materialName={values.m_name}
            materialCode={values.m_code}
            setFieldValue={setFieldValue}
          />
          <AutoSubmitEffect />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              p: "60px",
              backgroundColor: theme.colors.secondary_background_color,
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <Typography variant="h4">Register Raw Material</Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              <Box sx={{ flex: "1 1 45%" }}>
                <InputTextField
                  label="Material Name"
                  name="m_name"
                  textPlaceholder="Enter Material Name"
                  value={values.m_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.m_name && Boolean(errors.m_name)}
                  helperText={touched.m_name && errors.m_name ? errors.m_name : ""}
                />
              </Box>
              <Box sx={{ flex: "1 1 45%" }}>
                <InputTextField
                  label="Material Code"
                  name="m_code"
                  textPlaceholder="Enter Material Code"
                  value={values.m_code}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.m_code && Boolean(errors.m_code)}
                  helperText={touched.m_code && errors.m_code ? errors.m_code : ""}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              <Box sx={{ flex: "1 1 45%" }}>
                <InputSelectField
                  label="Category"
                  name="m_status"
                  options={categoryOptions}
                  value={values.m_status}
                  onChange={(e) => setFieldValue("m_status", e.target.value)}
                  error={touched.m_status && Boolean(errors.m_status)}
                  helperText={touched.m_status && errors.m_status ? errors.m_status : ""}
                />
              </Box>
              <Box sx={{ flex: "1 1 45%" }}>
                <InputSelectField
                  label="Unit"
                  name="m_unit"
                  options={unitOptions}
                  value={values.m_unit}
                  onChange={(e) => setFieldValue("m_unit", e.target.value)}
                  error={touched.m_unit && Boolean(errors.m_unit)}
                  helperText={touched.m_unit && errors.m_unit ? errors.m_unit : ""}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 5 }}>
              <Box sx={{ flex: "1 1 45%" }}>
                <InputTextField
                  label="Re-Order Level"
                  name="m_reorderLevel"
                  textPlaceholder="Enter Re-Order Level"
                  value={values.m_reorderLevel?.toString() ?? ""}
                  type="number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.m_reorderLevel && Boolean(errors.m_reorderLevel)}
                  helperText={
                    touched.m_reorderLevel && errors.m_reorderLevel
                      ? errors.m_reorderLevel
                      : ""
                  }
                />
              </Box>

              <Box sx={{ flex: "1 1 45%", display: "flex", alignItems: "center", gap: 1 }}>
                <Typography>This material has variants</Typography>
                <Switch
                  checked={values.hasVariants}
                  onChange={(e) => setFieldValue("hasVariants", e.target.checked)}
                  sx={{
                    "& .MuiSwitch-switchBase.Mui-checked": {
                      color: theme.colors.primary_color_green,
                      "& + .MuiSwitch-track": {
                        backgroundColor: theme.colors.primary_color_green,
                      },
                    },
                  }}
                />
              </Box>
            </Box>

            <InputTextArea
              label="Description"
              name="m_description"
              ariaLabel="description-textarea"
              placeholder="Enter Description"
              value={values.m_description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.m_description && Boolean(errors.m_description)}
              helperText={
                touched.m_description && errors.m_description ? errors.m_description : ""
              }
            />

            <Toaster ref={toasterRef} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export { MaterialPage };
