import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Chip } from '@mui/material';
import theme from '../../../components/theme';
import { InputSelectField, InputTextField } from '../../../components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setVariants } from '../../../features/rawMaterials/rawMaterialSlice';
import { useGetVariantsQuery } from '../../../features/variants/variantApiSlice';
import { RootState } from '../../../store';

interface VariantsForMaterialPageProps {}



export interface InputFieldProps {

  label: string;

  textPlaceholder: string;

  width: string;

  height: string;

  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;

}

const VariantsForMaterialPage: React.FC<VariantsForMaterialPageProps> = ({ }) => {
  const { data: variants } = useGetVariantsQuery();
  const varaintOptions =
    variants?.map((category: any) => ({
      id: category._id,
      name: category.name,
    })) || [];

  const dispatch = useDispatch();
  const { category } = useSelector((state: RootState) => state.rawMaterial);

  const [variantFields, setVariantFields] = useState<
    { variant: string; values: string[] }[]
  >([{ variant: '', values: [] }]);

  const handleAddVariant = () => {
    setVariantFields([...variantFields, { variant: '', values: [] }]);
  };

  const handleFieldChange = (
    index: number,
    field: 'variant',
    value: string
  ) => {
    const updatedFields = [...variantFields];
    updatedFields[index][field] = value; // Update the variant field
    setVariantFields(updatedFields);
  };

  const handleAddValue = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement> // Explicitly type event
  ) => {
    event.preventDefault(); // Prevent form submission
    const input = event.currentTarget;
    const value = input.value?.trim(); // Use optional chaining to avoid undefined issues
  
    if (event.key === 'Enter' && value) {
      const updatedFields = [...variantFields];
      updatedFields[index].values = [...updatedFields[index].values, value]; // Add value
      setVariantFields(updatedFields);
      input.value = ''; // Clear the input field
    }
  };
  
  

  const handleDeleteValue = (index: number, valueToDelete: string) => {
    const updatedFields = [...variantFields];
    updatedFields[index].values = updatedFields[index].values.filter(
      (value) => value !== valueToDelete
    );
    setVariantFields(updatedFields);
  };

  useEffect(() => {
    dispatch(setVariants(variantFields));
  }, [variantFields, dispatch]);


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
      <Typography variant="h4"  >
        Add Variants
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: '16px',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddVariant}
          sx={{
            backgroundColor: theme.colors.primary_color_green,
            color: theme.colors.secondary_background_color,
            width: '120px',
            height: '40px',
            textTransform: 'capitalize',
          }}
        >
          Add Variant
        </Button>
      </Box>

      {variantFields.map((field, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            gap: '24px',
            alignItems: 'flex-start',
            marginBottom: '16px',
          }}
        >
          <InputSelectField
            label={`Variant ${index + 1}`}
            options={varaintOptions}
            value={field.variant}
            onChange={(e) => handleFieldChange(index, 'variant', e.target.value)}
            width="300px"
            height="56px"
          />
          <Box sx={{ width: '500px' }}>
            <InputTextField
              label="Values"
              textPlaceholder="Enter Values"
              onKeyDown={(e) => handleAddValue(index, e)} // Handle Enter for adding values
              width="500px"
              height="40px"
            />
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                marginTop: '8px',
              }}
            >
              {field.values.map((val, idx) => (
                <Chip
                  key={idx}
                  label={val}
                  onDelete={() => handleDeleteValue(index, val)}
                  sx={{
                    backgroundColor: '#e0e0e0',
                    fontSize: '14px',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      ))}

     
    </Box>
  );
};

export { VariantsForMaterialPage };
