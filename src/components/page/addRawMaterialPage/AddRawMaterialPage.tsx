import React from 'react';
import { Header } from "../../organism/header/Header";
import { AddRawMaterial } from "../../molecules/addRawMaterial/AddRawMaterial";
import { useGetUnitsQuery } from '../../../features/units/UnitsApiSlice';
import { useGetCategoriesQuery } from '../../../features/categories/categoriesSlice';

interface Props {
    
}


type Option = {
  id: string;
  name: string;
};



const AddRawMaterialPage: React.FC<Props> = (props) => {

  const { data: Units, error, isLoading } = useGetUnitsQuery();
  const { data: categories } = useGetCategoriesQuery({});

  
  const unitOptions: Option[] = Units
    ? Units.map((unit: any) => ({
      id: unit._id,
      name: unit.unitName,
    }))
    : [];

    const categoryOptions: Option[] = categories
    ? categories.map((category: any) => ({
        id: category._id,
        name: category.name,
      }))
    : [];

  const handleSubmit = (
    m_name: string,
    m_code: string,
    category: string,
    unit: string,
    reorderlevel: number,
    description: string
  ) => {
    console.log('Raw Material Data:', { 
      m_name,
      m_code,
      category,
      unit,
      reorderlevel,
      description,
    });
  };

  return (
    <AddRawMaterial
            categoryoption={categoryOptions}
            unitoption={unitOptions}
            onsubmit={handleSubmit}
        />
  );
};

export { AddRawMaterialPage };