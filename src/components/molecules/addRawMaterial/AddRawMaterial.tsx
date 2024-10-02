import { Box, Switch, Typography, TextField, Button } from "@mui/material";
import React, { useEffect } from "react";
import { useCreateMaterialMutation, useLazyCheckMaterialCodeAvailabilityQuery, useLazyGenerateMaterialCodeQuery } from '../../../features/rawMaterials/rawMaterialApiSlice';
import { CreateRawMaterial } from "../../../features/rawMaterials/rawMaterialModel";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../store";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
  const { m_name, m_code, category, unit, reorderlevel, description, isCodeValid, hasVariants } = useSelector((state: RootState) => state.rawMaterial);

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
        height: "100%", 
        marginLeft: "5px",
        boxSizing: 'border-box' ,
        marginTop: '120px'
      
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Typography variant="h4">Add Raw Material</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "start" }}>
        <Box sx={{ marginRight: "185px" }}>
          <TextField
            label="Material Name"
            placeholder="Enter Material Name"
            value={m_name}
            onChange={(e) => dispatch(setMName(e.target.value))}
            sx={{ width: '300px' }}
          />
        </Box>
        <Box>
          <TextField
            label="Material Code"
            placeholder="Enter Material Code"
            value={m_code}
            onChange={(e) => dispatch(setMCode(e.target.value))}
            sx={{ width: '300px' }}
          />
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "start" }}>
      
      <Box sx={{ width: "300px"  , marginRight:'180px'}}>
         <FormControl fullWidth>
        <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            label="Category"
            onChange={(e) => dispatch(setCategory(e.target.value))}
              >
          {categoryoption.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
       </Select>
         </FormControl>
       </Box>
        
       <Box sx={{ width: "300px" }}>
       <FormControl fullWidth>
        <InputLabel id="unit-select-label">Unit</InputLabel>
        <Select
          labelId="unit-select-label"
          id="unit-select"
          value={unit}
          label="Unit"
          onChange={(e) => dispatch(setUnit(e.target.value))}
        >
          {unitoption.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
       </FormControl>
      </Box>
      </Box>

      <Box>
      <TextField
        label="Re-Order Level"
        placeholder="Enter Re-Order Level"
        value={reorderlevel}
        onChange={(e) => dispatch(setReorderLevel(Number(e.target.value)))}
        type="number"
        sx={{ width: '300px' }}  // Adjust the width as needed
/>

      </Box>

      <Box>
        <TextField
          label="Description"
          placeholder="Enter Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => dispatch(setDescription(e.target.value))}
          fullWidth
          sx={{ width: '600px' }}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Typography>This material has variants</Typography>
        <Switch
          checked={hasVariants}
          onChange={(e) => dispatch(setHasVariants(e.target.checked))}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "end", gap: "16px" , marginRight:"80px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRawMaterial}
        >
          Save
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(resetForm())}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export { AddRawMaterial };
