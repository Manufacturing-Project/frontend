import React, { useEffect, useRef } from "react";
import { Typography, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { Formik, Form, useFormikContext } from "formik";

import {
  useCreateMaterialMutation,
  useLazyCheckMaterialCodeAvailabilityQuery,
  useLazyGenerateMaterialCodeQuery,
} from "../../../features/rawMaterials/rawMaterialApiSlice";

import {
  setRawMaterialData,
} from "../../../features/rawMaterials/rawMaterialSlice";

import { useGetUnitsQuery } from "../../../features/units/UnitsApiSlice";
import { useGetCategoriesQuery } from "../../../features/categories/CategoryApiSlice";

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

import { Wrapper, Section, VariantSwitchWrapper } from "./MaterialPage.styled";
import { VariantsForMaterialPageProps } from "../../../utils/types/pages/materialPage.types";

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
  }, [materialName, triggerGenerateCode]);

  useEffect(() => {
    if (data) {
      setFieldValue("m_code", data.materialCode);
    }
  }, [data, setFieldValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (materialCode) triggerCheckCode(materialCode);
    }, 500);
    return () => clearTimeout(timer);
  }, [materialCode, triggerCheckCode]);

  return null;
};

const AutoSubmitEffect: React.FC = () => {
  const { isValid, submitForm } = useFormikContext();
  useEffect(() => {
    if (isValid) {
      submitForm();
    }
  }, [isValid, submitForm]);
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
      onSubmit={async (values) => {
        try {
          dispatch(
            setRawMaterialData({
              m_name: values.m_name,
              m_code: values.m_code,
              category: values.m_status,
              unit: values.m_unit,
              reorderlevel: Number(values.m_reorderLevel),
              description: values.m_description,
              hasVariants: values.hasVariants,
            })
          );
          // You can call createMaterial API here if needed
          // await createMaterial(values).unwrap();
          onNext();
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

          <Wrapper>
            <Typography variant="h4">Register Raw Material</Typography>

            <Section>
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
            </Section>

            <Section>
              <InputSelectField
                label="Category"
                name="m_status"
                options={categoryOptions}
                value={values.m_status}
                onChange={(e) => setFieldValue("m_status", e.target.value)}
                error={touched.m_status && Boolean(errors.m_status)}
                helperText={touched.m_status && errors.m_status ? errors.m_status : ""}
              />

              <InputSelectField
                label="Unit"
                name="m_unit"
                options={unitOptions}
                value={values.m_unit}
                onChange={(e) => setFieldValue("m_unit", e.target.value)}
                error={touched.m_unit && Boolean(errors.m_unit)}
                helperText={touched.m_unit && errors.m_unit ? errors.m_unit : ""}
              />
            </Section>

            <Section>
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

              <VariantSwitchWrapper>
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
              </VariantSwitchWrapper>
            </Section>

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
          </Wrapper>
        </Form>
      )}
    </Formik>
  );
};

export { MaterialPage };
