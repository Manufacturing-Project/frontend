import { Box, Button, Switch, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useCreateMaterialMutation, useLazyCheckMaterialCodeAvailabilityQuery, useLazyGenerateMaterialCodeQuery } from '../../../features/rawMaterials/rawMaterialApiSlice';
import { CreateRawMaterial } from "../../../features/rawMaterials/rawMaterialModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import theme from "../../../components/theme";
import {
  setMName,
  setMCode,
  setCategory,
  setUnit,
  setReorderLevel,
  setDescription,
  setIsCodeValid,
  setHasVariants,
  resetForm,
} from "../../../features/rawMaterials/rawMaterialSlice";
import { InputTextField, InputTextArea, InputSelectField } from "../../../components/molecules";

import { useGetUnitsQuery } from '../../../features/units/UnitsApiSlice';
import { useGetCategoriesQuery } from '../../../features/categories/CategoryApiSlice';
import { CreateUnit } from '../../../features/units/UnitModel';

interface Option {
  id: string;
  name: string;
}

interface Props {
}

const MaterialPage: React.FC<Props> = ({
  
}) => {

    const { data: units, error: unitsError, isLoading: unitsLoading } = useGetUnitsQuery();
    const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesQuery();

    const categoryoption = categories?.map((category: any) => ({
        id: category._id,
        name: category.name,
    })) || [];

    const unitoption = units?.map((unit: CreateUnit) => ({
        id: unit._id,
        name: unit.unitName,
    })) || [];

  const dispatch = useDispatch();
  const { m_name, m_code, category, unit, reorderlevel, description, isCodeValid, hasVariants } = useSelector((state: RootState) => state.rawMaterial);

  const [triggerGenerateCode, { data, isLoading, error }] = useLazyGenerateMaterialCodeQuery();
  const [triggerCheckCode, { data: codeAvailabilityData }] = useLazyCheckMaterialCodeAvailabilityQuery();
  const [createMaterial] = useCreateMaterialMutation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (m_name) {
        triggerGenerateCode(m_name);
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [m_name, triggerGenerateCode]);

  useEffect(() => {
    if (data) {
      dispatch(setMCode(data.materialCode));
    }
  }, [data]);

  useEffect(() => {
    if (m_code) {
      const delayDebounceFn = setTimeout(() => {
        triggerCheckCode(m_code);
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [m_code, triggerCheckCode]);

  useEffect(() => {
    if (codeAvailabilityData) {
      dispatch(setIsCodeValid(codeAvailabilityData.available));
    }
  }, [codeAvailabilityData]);

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
      const response = await createMaterial(material).unwrap();
      console.log('Material created successfully:', response);
    } catch (error) {
      console.error('Failed to create material:', error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        paddingLeft: '60px',
        backgroundColor: theme.colors.secondary_background_color,
        height: "100%",
        boxSizing: 'border-box' ,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register Raw Material
      </Typography>

      {/* Material Name and Code Fields */}
      <Box sx={{ display: "flex", gap: "40px" }}>
        <InputTextField
          label="Material Name"
          textPlaceholder="Enter Material Name"
          value={m_name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setMName(e.target.value))}
          width="530px"
        />
        <InputTextField
          label="Material Code"
          textPlaceholder="Enter Material Code"
          value={m_code}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setMCode(e.target.value))}
          width="530px"
        />
      </Box>

      {/* Category and Unit Fields */}
      <Box sx={{ display: "flex", gap: "40px" }}>
        <InputSelectField
          label="Category"
          options={categoryoption}
          value={category}
          onChange={(e) => dispatch(setCategory(e.target.value))}
          width="530px"
        />
        <InputSelectField
          label="Unit"
          options={unitoption}
          value={unit}
          onChange={(e) => dispatch(setUnit(e.target.value))}
          width="530px"
        />
      </Box>

      {/* Reorder Level Field */}
      <Box sx={{ display: "flex", gap: "40px" ,alignItems:'end'}}>
        <InputTextField
          label="Re-Order Level"
          textPlaceholder="Enter Re-Order Level"
          value={reorderlevel.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setReorderLevel(Number(e.target.value)))}
          width="530px"
        />

          {/* Has Variants Switch */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px", width: "100%" }}>
          <Typography>This material has variants</Typography>
          <Switch
          checked={hasVariants}
          onChange={(e) => dispatch(setHasVariants(e.target.checked))}
          sx={{
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: theme.colors.primary_color_green, 
              '& + .MuiSwitch-track': {
                backgroundColor: theme.colors.primary_color_green, 
              },
            },
          }}
        />
        </Box>
      </Box>

      {/* Description Field */}
      <Box>
        <InputTextArea
          label="Description"
          ariaLabel="description-textarea"
          placeholder="Enter Description"
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setDescription(e.target.value))}
        />
      </Box>

      

      {/* Action Buttons */}
      <Box sx={{ display: "flex", justifyContent: "end", gap: "16px", marginRight: "80px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRawMaterial}
          sx={{
            backgroundColor: theme.colors.primary_color_green,
            color: theme.colors.secondary_background_color,
            marginTop: '60px',
            width:"99px",
            height:"36px"
          }}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(resetForm())}
          sx={{
            backgroundColor: theme.colors.primary_color_green,
            color: theme.colors.secondary_background_color,
            marginTop: '60px',
            width:"99px",
            height:"36px"
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export { MaterialPage };