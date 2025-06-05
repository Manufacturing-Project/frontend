import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Switch, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
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
  resetForm,
} from "../../../features/rawMaterials/rawMaterialSlice";
import { useGetUnitsQuery } from "../../../features/units/UnitsApiSlice";
import { useGetCategoriesQuery } from "../../../features/categories/CategoryApiSlice";
import { CreateRawMaterial } from "../../../features/rawMaterials/rawMaterialModel";
import { CreateUnit } from "../../../features/units/UnitModel";
import { RootState } from "../../../store";
import theme from "../../../components/theme";
import Toaster, { ToasterRef } from "../../../components/molecules/toaster/Toaster";
import { InputTextField, InputTextArea, InputSelectField } from "../../../components/molecules";
import { Formik, Form } from "formik";
import * as Yup from "yup";

interface VariantsForMaterialPageProps {
  onNext: () => void;
}

const validationSchema = Yup.object({
  m_name: Yup.string().required("Material name is required"),
  m_code: Yup.string().required("Material code is required"),
  category: Yup.string().required("Category is required"),
  unit: Yup.string().required("Unit is required"),
  reorderlevel: Yup.number()
    .typeError("Reorder level must be a number")
    .min(0, "Reorder level must be non-negative")
    .required("Reorder level is required"),
  description: Yup.string().min(5, "Description must be at least 5 characters").required("Description is required"),
});

const MaterialPage: React.FC<VariantsForMaterialPageProps> = ({ onNext }) => {
  const dispatch = useDispatch();
  const toasterRef = useRef<ToasterRef>(null);

  const { data: units } = useGetUnitsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const unitOptions = units?.map((unit: CreateUnit) => ({
    id: unit._id,
    name: unit.unitName,
  })) || [];

  const categoryOptions = categories?.map((category: any) => ({
    id: category._id,
    name: category.name,
  })) || [];

  const {
    m_name,
    m_code,
    category,
    unit,
    reorderlevel,
    description,
    hasVariants,
  } = useSelector((state: RootState) => state.rawMaterial);

  const [triggerGenerateCode, { data }] = useLazyGenerateMaterialCodeQuery();
  const [triggerCheckCode] = useLazyCheckMaterialCodeAvailabilityQuery();
  const [createMaterial] = useCreateMaterialMutation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (m_name) triggerGenerateCode(m_name);
    }, 500);
    return () => clearTimeout(timer);
  }, [m_name, triggerGenerateCode]);

  useEffect(() => {
    if (data) dispatch(setMCode(data.materialCode));
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (m_code) triggerCheckCode(m_code);
    }, 500);
    return () => clearTimeout(timer);
  }, [m_code, triggerCheckCode]);

  const handleRawMaterial = async () => {
    const material: CreateRawMaterial = {
      materialName: m_name,
      materialCode: m_code,
      category,
      unitOfMeasure: unit,
      reorderLevel: reorderlevel,
      description,
      hasVariants: hasVariants ?? false,
    };

    try {
      await createMaterial(material).unwrap();
      dispatch(resetForm());
      toasterRef.current?.showToast("Material created successfully!", "success");
    } catch (error) {
      toasterRef.current?.showToast("Failed to create material.", "error");
    }
  };

  return (
    <Formik 
      initialValues={{
        m_name: m_name || "",
        m_code: m_code || "",
        category: category || "",
        unit: unit || "",
        reorderlevel: reorderlevel || "",
        description: description || "",
        hasVariants: hasVariants || false,
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
       onNext();
      }}
      enableReinitialize
    >

{({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
        handleSubmit,
      }) => (
        <Form>
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
          textPlaceholder="Enter Material Name"
          value={m_name}
          onChange={(e) => dispatch(setMName(e.target.value))}
          width="530px"
        />
        <InputTextField
          label="Material Code"
          textPlaceholder="Enter Material Code"
          value={m_code}
          onChange={(e) => dispatch(setMCode(e.target.value))}
          width="530px"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 5 }}>
        <InputSelectField
          label="Category"
          options={categoryOptions}
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          width="530px"
        />
        <InputSelectField
          label="Unit"
          options={unitOptions}
          value={unit}
          onChange={(e) => dispatch(setUnit(e.target.value))}
          width="530px"
        />
      </Box>

      <Box sx={{ display: "flex", gap: 5, alignItems: "flex-end" }}>
        <InputTextField
          label="Re-Order Level"
          textPlaceholder="Enter Re-Order Level"
          value={reorderlevel.toString()}
          onChange={(e) => dispatch(setReorderLevel(Number(e.target.value)))}
          width="530px"
        />

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
          <Typography>This material has variants</Typography>
          <Switch
            checked={hasVariants}
            onChange={(e) => dispatch(setHasVariants(e.target.checked))}
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
        ariaLabel="description-textarea"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => dispatch(setDescription(e.target.value))}
      />

      {/* <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          onClick={handleRawMaterial}
          startIcon={<Done />}
          sx={{
            backgroundColor: theme.colors.primary_color_green,
            "&:hover": {
              backgroundColor: theme.colors.primary_color_green,
              opacity: 0.9,
            },
          }}
        >
          Save Material
        </Button>
      </Box> */}

      <Toaster ref={toasterRef} />
    </Box>
   </Form>
      )}

    </Formik>
   
  );
};

export { MaterialPage };
