// src/components/organism/Variants.stories.tsx
import React from 'react';
import { VariantsPage } from './VariantsPage';
import { Provider } from 'react-redux';
import { store } from '../../../store'; // Adjust the import path based on your store setup

export default {
  title: 'Pages/Variants/VariantsPage',
  component: VariantsPage,
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
    <VariantsPage />
  </Wrapper>
);

// Story for loading state (you might want to mock your API)
export const Loading = () => (
  <Wrapper>
    <VariantsPage />
  </Wrapper>
);

// Story for empty state (when there are no variants)
export const Empty = () => (
  <Wrapper>
    <VariantsPage />
  </Wrapper>
);

// Example of how to add a variant
export const WithVariants = () => {
  // You would typically mock the API response here
  return (
    <Wrapper>
      <VariantsPage />
    </Wrapper>
  );
};

// Optionally, you can add stories for error states or interactions
