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

// Story for loading state (you might want to mock your API)
export const Loading = () => (
  <Wrapper>
    <CategoryPage />
  </Wrapper>
);

// Story for empty state (when there are no categories)
export const Empty = () => (
  <Wrapper>
    <CategoryPage />
  </Wrapper>
);

// Example of how to add a category
export const WithCategories = () => {
  // You would typically mock the API response here
  return (
    <Wrapper>
      <CategoryPage />
    </Wrapper>
  );
};

// Optionally, you can add stories for error states or interactions
