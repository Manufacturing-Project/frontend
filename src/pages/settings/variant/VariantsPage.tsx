import React from 'react';
import { useDispatch } from 'react-redux';
import {Setting} from '../../../components/organism/setting/Setting'; // Adjust the import path
import { useCreateVariantMutation, useDeleteVariantMutation, useGetVariantsQuery, useUpdateVariantMutation } from '../../../features/variants/variantApiSlice'; // API hooks

const VariantsPage: React.FC = () => {
  const dispatch = useDispatch();

  // Fetch Variants from the API and refetch after any changes
  const { data: variants = [], refetch } = useGetVariantsQuery(); 
  const [createVariant] = useCreateVariantMutation(); // Hook to create a Variant
  const [updateVariant] = useUpdateVariantMutation(); // Hook to update a Variant
  const [deleteVariant] = useDeleteVariantMutation(); // Hook to delete a Variant

  // Create a new variant
  const createItem = async (name: string) => {
    try {
      await createVariant({ variantName: name, _id: undefined }).unwrap();
      refetch(); // Refetch variants after adding the new variant
    } catch (error) {
      console.error("Error creating variant:", error);
    }
  };

  // Update an existing variant
  const updateItem = async (id: string, name: string) => {
    try {
      await updateVariant({ id, variant: { _id: id, variantName: name } }).unwrap();
      refetch(); // Refetch variants after updating
    } catch (error) {
      console.error("Error updating variant:", error);
    }
  };

  // Delete a variant
  const deleteItem = async (id: string) => {
    try {
      await deleteVariant(id).unwrap();
      refetch(); // Refetch variants after deleting
    } catch (error) {
      console.error("Error deleting variant:", error);
    }
  };

  // Map the variants data to the format expected by the `Setting` component
  const variantItems = variants.map(variant => ({
    id: variant._id,
    name: variant.variantName,
  }));

  

  return (
    <Setting
      title="Variants"
      items={variantItems}
      buttonName="Variant"
      createItem={createItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
    />
  );
};

export { VariantsPage };
