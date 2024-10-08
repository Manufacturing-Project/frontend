import flattenDeep from 'lodash/flattenDeep';
import { RouteObject } from 'react-router-dom';
import {RegisterLayout, SettingLayout, ManufactureLayout} from '../layouts';
import { AddRawMaterialPage, Dashboard, Category, Variants, UnitOfMeasure, Product } from '../components/organism';
import { Suppliers } from '../components/organism/suppliers/Suppliers';


const routes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <Dashboard />,

  },
  {
    path: '/register',
    element: <RegisterLayout />,
    children: [
      { path: '/register/material', element: <AddRawMaterialPage /> },
      {path: '/register/product', element: <Product />},
    ],
  },
  {
    path: '/manufacture',
    element: <ManufactureLayout />,
    children: [
      { path: '/manufacture/purchase', element: <Product /> },
      { path: '/manufacture/material', element: <Product /> },
    ],
  },
  {
    path: '/setting',
    element: <SettingLayout />,
    children: [
      { path: '/setting/variants', element: <Variants /> },
      { path: '/setting/supplier', element: <Suppliers /> },
      { path: '/setting/category', element: <Category /> },
      { path: '/setting/unit', element: <UnitOfMeasure /> },
    ],
  },
];

const generateFlattenRoutes = (routes: RouteObject[]): RouteObject[] => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ children, ...rest }) => [rest, generateFlattenRoutes(children || [])]));
};

export const flattenedRoutes = generateFlattenRoutes(routes);