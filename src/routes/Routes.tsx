import flattenDeep from 'lodash/flattenDeep';
import { RouteObject } from 'react-router-dom';
import {RegisterLayout} from '../layouts/RegisterLayout';
import {SettingLayout} from '../layouts/SettingLayout';
import { AddRawMaterialPage, Dashboard, Category, Variants, UnitOfMeasure, Product } from '../components/organism';


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
    path: '/setting',
    element: <SettingLayout />,
    children: [
      { path: '/setting/variant', element: <Variants /> },
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
