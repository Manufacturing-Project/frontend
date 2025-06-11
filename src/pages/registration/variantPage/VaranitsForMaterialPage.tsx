import React, { useEffect, useState } from 'react';
import { Typography, Chip } from '@mui/material';
import theme from '../../../components/theme';
import { InputSelectField, InputTextField } from '../../../components/molecules';
import { useDispatch } from 'react-redux';
import { setVariants } from '../../../features/rawMaterials/rawMaterialSlice';
import { useGetVariantsQuery } from '../../../features/variants/variantApiSlice';
import {
  Wrapper,
  GridRow,
  GridItem,
  AddButtonStyled,
  ChipsContainer,
  FieldsGrid,
} from './VariantsForMaterialPage.styled';
import { VariantField } from '../../../utils/types/pages/variantsForMaterialPage.types';

const VariantsForMaterialPage: React.FC = () => {
  const { data: variants } = useGetVariantsQuery();
  const dispatch = useDispatch();

  const variantOptions =
    variants?.map((v: any) => ({ id: v._id, name: v.variantName })) || [];

  const [variantFields, setVariantFields] = useState<VariantField[]>([
    { variant: '', values: [] },
  ]);
  const [inputValues, setInputValues] = useState<string[]>(['']);

  const handleAddVariant = () => {
    setVariantFields(prev => [...prev, { variant: '', values: [] }]);
    setInputValues(prev => [...prev, '']);
  };

  const handleFieldChange = (index: number, value: string) => {
    setVariantFields(prev =>
      prev.map((item, idx) => (idx === index ? { ...item, variant: value } : item))
    );
  };

  const handleInputChange = (index: number, value: string) => {
    setInputValues(prev => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleAddValue = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = inputValues[index].trim();
      if (value) {
        setVariantFields(prev =>
          prev.map((item, idx) =>
            idx === index ? { ...item, values: [...item.values, value] } : item
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

  const handleDeleteValue = (index: number, valToRemove: string) => {
    setVariantFields(prev =>
      prev.map((item, idx) =>
        idx === index
          ? { ...item, values: item.values.filter(val => val !== valToRemove) }
          : item
      )
    );
  };

  useEffect(() => {
    dispatch(setVariants(variantFields));
  }, [variantFields, dispatch]);

  return (
    <Wrapper>
      <Typography variant="h4">Add Variants</Typography>

      <AddButtonStyled onClick={handleAddVariant}>Add Variant</AddButtonStyled>

      <FieldsGrid>
        {variantFields.map((field, index) => (
          <GridRow key={index}>
            <GridItem>
              <InputSelectField
                label={`Variant ${index + 1}`}
                options={variantOptions}
                value={field.variant}
                onChange={(e: { target: { value: string } }) =>
                  handleFieldChange(index, e.target.value)
                }
                width="100%"
                height="56px"
              />
            </GridItem>
            <GridItem>
              <InputTextField
                label="Values"
                textPlaceholder="Enter Values"
                value={inputValues[index] || ''}
                onChange={e => handleInputChange(index, e.target.value)}
                onKeyDown={e => handleAddValue(index, e)}
                width="100%"
                height="40px"
              />
              <ChipsContainer>
                {field.values.map((val, idx) => (
                  <Chip
                    key={idx}
                    label={val}
                    onDelete={() => handleDeleteValue(index, val)}
                  />
                ))}
              </ChipsContainer>
            </GridItem>
          </GridRow>
        ))}
      </FieldsGrid>
    </Wrapper>
  );
};

export { VariantsForMaterialPage };
