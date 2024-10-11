import React from 'react';
import { useDispatch } from 'react-redux';
import {Setting} from '../../../components/organism/setting/Setting'; // Adjust the import path
// import { useCreatesupplierMutation, useDeletesupplierMutation, useGetSuppliersQuery, useUpdatesupplierMutation } from '../../../features/Suppliers/supplierApiSlice'; // API hooks

const SuppliersPage: React.FC = () => {
  const dispatch = useDispatch();

  // Fetch Suppliers from the API and refetch after any changes
//   const { data: Suppliers = [], refetch } = useGetSuppliersQuery(); 
//   const [createsupplier] = useCreatesupplierMutation(); // Hook to create a supplier
//   const [updatesupplier] = useUpdatesupplierMutation(); // Hook to update a supplier
//   const [deletesupplier] = useDeletesupplierMutation(); // Hook to delete a supplier

  // Create a new supplier

  let Suppliers: any = [];

  const createItem = async (name: string) => {
    // try {
    //   await createsupplier({ supplierName: name, _id: undefined }).unwrap();
    //   refetch(); // Refetch Suppliers after adding the new supplier
    // } catch (error) {
    //   console.error("Error creating supplier:", error);
    // }
  };

  // Update an existing supplier
  const updateItem = async (id: string, name: string) => {
    // try {
    //   await updatesupplier({ id, supplier: { _id: id, supplierName: name } }).unwrap();
    //   refetch(); // Refetch Suppliers after updating
    // } catch (error) {
    //   console.error("Error updating supplier:", error);
    // }
  };

  // Delete a supplier
  const deleteItem = async (id: string) => {
    // try {
    //   await deletesupplier(id).unwrap();
    //   refetch(); // Refetch Suppliers after deleting
    // } catch (error) {
    //   console.error("Error deleting supplier:", error);
    // }
  };

  // Map the Suppliers data to the format expected by the `Setting` component
  const suppliersItems = Suppliers.map((supplier: { _id: any; supplierName: any; }) => ({
    id: supplier._id,
    name: supplier.supplierName,
  }));

  return (
    <Setting
      title="Suppliers"
      items={suppliersItems}
      buttonName="supplier"
      createItem={createItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
    />
  );
};

export { SuppliersPage };
