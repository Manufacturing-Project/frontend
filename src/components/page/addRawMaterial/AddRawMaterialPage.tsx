import React from 'react';
import { AddRawMaterial } from "../../molecules";

interface Props {
    
}



const AddRawMaterialPage: React.FC<Props> = (props) => {

  const categoryOptions = [
    { id: '1', name: 'Paper' },
    { id: '2', name: 'Plastic'},
  ];

  const unitOptions = [
    { id: '1', name: 'Kilogram' },
    { id: '2', name: 'Gram' },
  ];

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
    <>
        
        <AddRawMaterial
            categoryoption={categoryOptions}
            unitoption={unitOptions}
            onsubmit={handleSubmit}
        />
    </>
  );
};

export { AddRawMaterialPage };