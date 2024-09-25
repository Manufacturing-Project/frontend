import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  InputSelectField,
  InputTextField,
  TextareaField,
} from "../../atoms";
import { useCreateMaterialMutation, useLazyCheckMaterialCodeAvailabilityQuery, useLazyGenerateMaterialCodeQuery } from '../../../features/rawMaterials/rawMaterialSlice';
import { CreateRawMaterial } from "../../../models/rawMaterialModel";

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
  const [m_name, setM_name] = useState<string>("");
  const [m_code, setM_code] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [reorderlevel, setReorderlevel] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [isCodeValid, setIsCodeValid] = useState<boolean>(true);

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
      setM_code(data.materialCode);
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
      setIsCodeValid(codeAvailabilityData.available);
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
            width: "1220px",
            marginLeft: "40px",
            gap: "32px",
        }}
    >
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
            onchange={(e) => setM_name(e.target.value)}
          /> 
        </Box>
        <Box>
          <InputTextField
            label="Material Code"
            textPlaceholder="Enter Material Code"
            value={m_code}
            onchange={(e) => setM_code(e.target.value)}
          />
        </Box>
      </Box>

      <Box
      sx={{
        display: "flex",
          justifyContent: "start",
      }}
      >
        <Box>
          <InputSelectField
            label="Category"
            options={categoryoption}
            value={category}
            onChange={(e) => setCategory(e.target.value as string)}
          />
        </Box>
        <Box>
          <InputSelectField
            label="Unit"
            options={unitoption}
            value={unit}
            onChange={(e) => setUnit(e.target.value as string)}
          />
        </Box>
      </Box>

      <Box>
        <InputTextField
          label="Re-OrderLevel"
          textPlaceholder="Enter Re-OrderLevel"
          value={reorderlevel}
          onchange={(e) => setReorderlevel(Number(e.target.value))}
        />
      </Box>

      <Box>
        <TextareaField
          label="Description"
          ariaLabel="Description"
          placeholder="Enter Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /> 
      </Box>

      <Box
        sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
      >
        <Box>
          <CustomButton primary label="Save" onClick={handleRawMaterial} />
        </Box>

        <Box>
          <CustomButton primary label="Cancel" />
        </Box>
      </Box>
    </Box>
  );
};

export { AddRawMaterial };
