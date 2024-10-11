import flattenDeep from 'lodash/flattenDeep';
import { RouteObject } from 'react-router-dom';
import {RegisterLayout, SettingLayout, ManufactureLayout} from '../layouts';
import { MaterialPage, Dashboard, CategoryPage, VariantsPage, UnitPage, Product, SuppliersPage } from '../pages';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <Dashboard />,

  },
  {
    path: '/dashboard',
    element: <Dashboard />,

  },
  {
    path: '/register',
    element: <RegisterLayout />,
    children: [
      { path: '/register/material', element: <MaterialPage /> },
      {path: '/register/product', element: <Product />},
    ],
  },
  {
    path: '/manufacture',
    element: <ManufactureLayout />,
    children: [
      { path: '/manufacture/purchase', element: <Product /> },
      { path: '/manufacture/history', element: <Product /> },
    ],
  },
  {
    path: '/setting',
    element: <SettingLayout />,
    children: [
      { path: '/setting/variants', element: <VariantsPage /> },
      { path: '/setting/supplier', element: <SuppliersPage /> },
      { path: '/setting/category', element: <CategoryPage /> },
      { path: '/setting/unit', element: <UnitPage /> },
    ],
  },
];

const generateFlattenRoutes = (routes: RouteObject[]): RouteObject[] => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ children, ...rest }) => [rest, generateFlattenRoutes(children || [])]));
};

export const flattenedRoutes = generateFlattenRoutes(routes);
