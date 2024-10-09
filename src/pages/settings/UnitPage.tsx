// src/components/organism/UnitOfMeasure.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useCreateUnitMutation, useGetUnitsQuery, useUpdateUnitMutation, useDeleteUnitMutation } from '../../../src/features/units/UnitsApiSlice';
import Setting from '../../components/organism/setting/Setting'; // Adjust the import path

const UnitPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: units = [], refetch } = useGetUnitsQuery();
  const [createUnit] = useCreateUnitMutation();
  const [updateUnit] = useUpdateUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();

  const createItem = async (name: string) => {
    await createUnit({ unitName: name, _id: undefined }).unwrap();
    refetch();
  };

  const updateItem = async (id: string, name: string) => {
    await updateUnit({ id, unit: { _id: id, unitName: name } }).unwrap();
    refetch();
  };

  const deleteItem = async (id: string) => {
    await deleteUnit(id).unwrap();
    refetch();
  };

  const unitItems = units.map(unit => ({
    id: unit._id,
    name: unit.unitName,
  }));

  return (
    <Setting
      title="Unit of Measure"
      items={unitItems}
      buttonName = "unit"
      createItem={createItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
    />
  );
};

export { UnitPage };
