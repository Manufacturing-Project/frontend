// src/components/organism/Category.tsx
import React from 'react';
import { useCreateCategoryMutation, useGetCategoriesQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } from '../../../features/categories/CategoryApiSlice';
import {Setting} from '../../../components/organism/setting/Setting'; // Adjust the import path

const CategoryPage: React.FC = () => {
  const { data: categories = [], refetch } = useGetCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();


  type Option = {
    id: string;
    name: string;
  };
  const createItem = async (name: string) => {
    await createCategory({ name }).unwrap();
    refetch();
  };

  const updateItem = async (id: string, name: string) => {
    await updateCategory({ id, category: { name } }).unwrap();
    refetch();
  };

  const deleteItem = async (id: string) => {
    await deleteCategory(id).unwrap();
    refetch();
  };

  const categoryOptions: Option[] = categories.map((category: any) => ({
    id: category._id,
    name: category.name,    
  }));


  return (
    <Setting
      title="Category"
      buttonName='Category'
      items={categoryOptions}
      createItem={createItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
    />
  );
};

export { CategoryPage };
