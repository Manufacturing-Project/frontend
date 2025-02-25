import { Box, Button, Switch, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useCreateMaterialMutation, useLazyCheckMaterialCodeAvailabilityQuery, useLazyGenerateMaterialCodeQuery } from '../../../features/rawMaterials/rawMaterialApiSlice';
import { CreateRawMaterial } from "../../../features/rawMaterials/rawMaterialModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import theme from "../../../components/theme";

import Done from '@mui/icons-material/Done';
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
import Toaster, { ToasterRef } from '../../../components/molecules/toaster/Toaster'; // Import the Toaster component

interface VariantsForMaterialPageProps {
  onNext: () => void;
}


interface Option {
  id: string;
  name: string;
}


const MaterialPage: React.FC<VariantsForMaterialPageProps> = ({onNext}) => {
  const { data: units } = useGetUnitsQuery();
  const { data: categories } = useGetCategoriesQuery();

  const categoryoption = categories?.map((category: any) => ({
    id: category._id,
    name: category.name,
  })) || [];

  const unitoption = units?.map((unit: CreateUnit) => ({
    id: unit._id,
    name: unit.unitName,
  })) || [];

  const dispatch = useDispatch();
  const { m_name, m_code, category, unit, reorderlevel, description, hasVariants } = useSelector((state: RootState) => state.rawMaterial);

  const [triggerGenerateCode,  { data, isLoading, error }] = useLazyGenerateMaterialCodeQuery();
  const [triggerCheckCode] = useLazyCheckMaterialCodeAvailabilityQuery();
  const [createMaterial] = useCreateMaterialMutation();

  // Create a ref for Toaster
  const toasterRef = useRef<ToasterRef>(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page (1 = MaterialPage, 2 = VariantsPage, 3 = GeneratedMaterialTable)
  const [showVariantsPage, setShowVariantsPage] = useState(false); // Track if Variants page should be shown
  

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
      dispatch(resetForm());

      // Show success toaster message
      toasterRef.current?.showToast('Material created successfully!', 'success');
    } catch (error) {
      console.error('Failed to create material:', error);

      // Show error toaster message
      toasterRef.current?.showToast('Failed to create material.', 'error');
    }
  };

  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
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
        boxSizing: 'border-box',
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
      <Box sx={{ display: "flex", gap: "40px", alignItems: 'end' }}>
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
            }}}
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
    

      {/* Toaster Component */}
      <Toaster ref={toasterRef} />
    </Box>
  );
};

export { MaterialPage };
