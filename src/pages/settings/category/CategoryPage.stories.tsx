// src/components/organism/Category.stories.tsx
import React from 'react';
import { CategoryPage } from './CategoryPage';
import { Provider } from 'react-redux';
import { store } from '../../../store'; // Adjust the import path based on your store setup

export default {
  title: 'Pages/Category/CategoryPage',
  component: CategoryPage,
};

// Define a type for the Wrapper's props
interface WrapperProps {
  children: React.ReactNode;
}

// Create a wrapper component to provide the store
const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

// Story for the default state
export const Default = () => (
  <Wrapper>
    <CategoryPage />
  </Wrapper>
);



// Optionally, you can add stories for error states or interactions
