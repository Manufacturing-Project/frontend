import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Chip } from '@mui/material';
import theme from '../../../components/theme';
import { InputSelectField, InputTextField } from '../../../components/molecules';
import { useDispatch, useSelector } from 'react-redux';
import { setVariants } from '../../../features/rawMaterials/rawMaterialSlice';
import { useGetVariantsQuery } from '../../../features/variants/variantApiSlice';
import { RootState } from '../../../store';

interface VariantsForMaterialPageProps {}

const VariantsForMaterialPage: React.FC<VariantsForMaterialPageProps> = () => {
  const { data: variants } = useGetVariantsQuery();

  const variantOptions =
    variants?.map((variantItem: any) => ({
      id: variantItem._id,
      name: variantItem.variantName,
    })) || [];

  const dispatch = useDispatch();

  const [variantFields, setVariantFields] = useState<
    { variant: string; values: string[] }[]
  >([{ variant: '', values: [] }]);

  // Track input value for each variant row
  const [inputValues, setInputValues] = useState<string[]>(['']);

  const handleAddVariant = () => {
    setVariantFields([...variantFields, { variant: '', values: [] }]);
    setInputValues([...inputValues, '']);
  };

  const handleFieldChange = (
    index: number,
    field: 'variant',
    value: string
  ) => {
    setVariantFields(prev =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, [field]: value }
          : item
      )
    );
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddValue = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = inputValues[index]?.trim();
      if (value) {
        setVariantFields(prev =>
          prev.map((item, idx) =>
            idx === index
              ? { ...item, values: [...item.values, value] }
              : item
          )
        );
        setInputValues(prev => {
          const updated = [...prev];
          updated[index] = '';
          return updated;
        });
      }
    }
  };

  const handleDeleteValue = (index: number, valueToDelete: string) => {
    setVariantFields(prev =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, values: item.values.filter(val => val !== valueToDelete) }
          : item
      )
    );
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
      <Typography variant="h4">
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
            options={variantOptions}
            value={field.variant}
            onChange={(e: { target: { value: string; }; }) => handleFieldChange(index, 'variant', e.target.value)}
            width="300px"
            height="56px"
          />
          <Box sx={{ width: '500px' }}>
            <InputTextField
              label="Values"
              textPlaceholder="Enter Values"
              value={inputValues[index] || ''}
              onChange={e => handleInputChange(index, e.target.value)}
              onKeyDown={e => handleAddValue(index, e)}
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