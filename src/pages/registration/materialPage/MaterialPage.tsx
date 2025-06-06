import React, { useEffect, useRef } from "react";
import { Box, Switch, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";

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
}> = ({ materialName, materialCode,setFieldValue }) => {
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
      onSubmit={async (values, { resetForm }) => {
        const material: CreateRawMaterial = {
          materialName: values.m_name,
          materialCode: values.m_code,
          category: values.m_status,
          unitOfMeasure: values.m_unit,
          reorderLevel: Number(values.m_reorderLevel),
          description: values.m_description,
          hasVariants: values.hasVariants,
        };

        try {
          await createMaterial(material).unwrap();

          dispatch(setMName(values.m_name));
          dispatch(setMCode(values.m_code));
          dispatch(setCategory(values.m_status));
          dispatch(setUnit(values.m_unit));
          dispatch(setReorderLevel(Number(values.m_reorderLevel)));
          dispatch(setDescription(values.m_description));
          dispatch(setHasVariants(values.hasVariants));

          toasterRef.current?.showToast("Material created successfully!", "success");
          resetForm();
          onNext();
        } catch (error) {
          toasterRef.current?.showToast("Failed to create material.", "error");
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, setFieldValue }) => (
        <Form>
          {/* Auto-effects must be outside Formik's render logic */}
          <AutoCodeEffects
            materialName={values.m_name}
            materialCode={values.m_code}
            setFieldValue={setFieldValue}
            
          />

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

            <Box sx={{ display: "flex", gap: 5 }}>
              <InputTextField
                label="Material Name"
                name="m_name"
                textPlaceholder="Enter Material Name"
                value={values.m_name} //check this
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.m_name && Boolean(errors.m_name)}
                helperText={touched.m_name && errors.m_name ? errors.m_name : ""}
                width="530px"
              />
              <InputTextField
                label="Material Code"
                name="m_code"
                textPlaceholder="Enter Material Code"
                value={values.m_code}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.m_code && Boolean(errors.m_code)}
                helperText={touched.m_code && errors.m_code ? errors.m_code : ""}
                width="530px"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 5 }}>
              <InputSelectField
                label="Category"
                name="m_status"
                options={categoryOptions}
                value={values.m_status}
                onChange={(e) => setFieldValue("m_status", e.target.value)}
                error={touched.m_status && Boolean(errors.m_status)}
                helperText={touched.m_status && errors.m_status ? errors.m_status : ""}
                width="530px"
              />
              <InputSelectField
                label="Unit"
                name="m_unit"
                options={unitOptions}
                value={values.m_unit}
                onChange={(e) => setFieldValue("m_unit", e.target.value)}
                error={touched.m_unit && Boolean(errors.m_unit)}
                helperText={touched.m_unit && errors.m_unit ? errors.m_unit : ""}
                width="530px"
              />
            </Box>

            <Box sx={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
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
                width="530px"
              />

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
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
                touched.m_description && errors.m_description
                  ? errors.m_description
                  : ""
              }
            />

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <button type="submit" style={{ display: "none" }} />
            </Box>

            <Toaster ref={toasterRef} />
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export { MaterialPage };
