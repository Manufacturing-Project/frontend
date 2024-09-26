import { Box, Switch, Typography } from "@mui/material";
import React, { useEffect} from "react";
import {
  CustomButton,
  InputSelectField,
  InputTextField,
  TextareaField,
} from "../../atoms";
import { useCreateMaterialMutation, useLazyCheckMaterialCodeAvailabilityQuery, useLazyGenerateMaterialCodeQuery } from '../../../features/rawMaterials/rawMaterialApiSlice';
import { CreateRawMaterial } from "../../../features/rawMaterials/rawMaterialModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
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

interface Option {
  id: string;
  name: string;
}

interface Props {
  categoryoption: Option[];
  unitoption: Option[];
  onsubmit: (
    m_name: string,
    m_code: string,
    category: string,
    unit: string,
    reorderlevel: number,
    description: string
  ) => void;
}

const AddRawMaterial: React.FC<Props> = ({
  categoryoption,
  unitoption,
  onsubmit,
}) => {

  const dispatch = useDispatch();
  const {m_name, m_code, category, unit, reorderlevel, description, isCodeValid, hasVariants } = useSelector((state: RootState) => state.rawMaterial);

  const [triggerGenerateCode, { data, isLoading, error }] = useLazyGenerateMaterialCodeQuery();
  const [triggerCheckCode, { data: codeAvailabilityData }] = useLazyCheckMaterialCodeAvailabilityQuery();
  const [createMaterial] = useCreateMaterialMutation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (m_name) {
        console.log('Triggering backend call for material name:', m_name);
        triggerGenerateCode(m_name);
      }
    }, 500);
  
    return () => clearTimeout(delayDebounceFn);
  }, [m_name, triggerGenerateCode]);
  

  useEffect(() => {
    if (data) {
      console.log('API Response:', data);
      dispatch(setMCode(data.materialCode));
    } else {
      console.log('No data received');
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
      hasVariants: false,
    };

   
    try {
      const response = await createMaterial(material).unwrap();
      console.log('Material created successfully:', response);
      onsubmit(m_name, m_code, category, unit, reorderlevel, description);
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
        padding: "16px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        width: "100%", // Adjust this width according to right panel needs
        height: "100%", // Adjust this height to align with the header and left panel
      }}
    >
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Typography variant="h4">Add Raw Material</Typography>
      </Box>

      {/* First row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            marginRight: "185px",
          }}
        >
          <InputTextField
            label="Material Name"
            textPlaceholder="Enter Material Name"
            value={m_name}
            onchange={(e) => dispatch(setMName(e.target.value))}
          /> 
        </Box>
        <Box>
          <InputTextField
            label="Material Code"
            textPlaceholder="Enter Material Code"
            value={m_code}
            onchange={(e) => dispatch(setMCode(e.target.value))}
            width="300px"
          />
        </Box>
      </Box>

      {/* Second row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
        }}
      >
        <Box
          sx={{
            marginRight: "185px",
          }}
        >
          <InputSelectField
            label="Category"
            options={categoryoption}
            value={category}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          />
        </Box>
        <Box>
          <InputSelectField
            label="Unit"
            options={unitoption}
            value={unit}
            onChange={(e) => dispatch(setUnit(e.target.value))}
          />
        </Box>
      </Box>

      {/* Reorder Level */}
      <Box>
        <InputTextField
          label="Re-Order Level"
          textPlaceholder="Enter Re-Order Level"
          value={reorderlevel}
          onchange={(e) => dispatch(setReorderLevel(Number(e.target.value)))}
          width="300px"
        />
      </Box>
 
      {/* Description */}
      <Box>
        <TextareaField
          label="Description"
          ariaLabel="Description" 
          placeholder="Enter Description"
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
        /> 
      </Box>

      {/* This material has variants */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Typography>This material has variants</Typography>
        <Switch
          checked={hasVariants}
          onChange={(e) => setHasVariants(e.target.checked)}
        />
      </Box>

      {/* Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "end",
          gap: "16px",
        }}
      >
        <CustomButton primary label="Save" onClick={handleRawMaterial} />
        <CustomButton primary label="Cancel" onClick={() => dispatch(resetForm())}/>
      </Box>
      
    </Box>
  );
};

export { AddRawMaterial };
