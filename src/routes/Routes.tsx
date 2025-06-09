import flattenDeep from 'lodash/flattenDeep';
import { RouteObject } from 'react-router-dom';
import {RegisterLayout, SettingLayout, ManufactureLayout} from '../layouts';

import {  Dashboard, CategoryPage, VariantsPage, UnitPage, Product, SuppliersPage , LoginPage , RegisterPage } from '../pages';
import RegisterationPage from '../pages/registration/RegisterationPage';
import ProtectedRoutes from './ProtectedRoutes';


const routes: RouteObject[] = [
  {
    path: '/',
    element: <LoginPage/>,

  },
  {
    path: '/dashboard',
    element: <ProtectedRoutes><Dashboard /></ProtectedRoutes>, 
  },
  {
    path: '/register',
    element: <ProtectedRoutes><RegisterLayout /></ProtectedRoutes>, 
    children: [
      { path: '/register/material', element: <RegisterationPage /> },
      { path: '/register/product', element: <Product /> },
    ],
  },
  {
    path: '/manufacture',
    element: <ProtectedRoutes><ManufactureLayout /></ProtectedRoutes>, 
    children: [
      { path: '/manufacture/purchase', element: <Product /> },
      { path: '/manufacture/history', element: <Product /> },
    ],
  },
  {
    path: '/setting',
    element: <ProtectedRoutes><SettingLayout /></ProtectedRoutes>, 
    children: [
      { path: '/setting/variants', element: <VariantsPage /> },
      { path: '/setting/supplier', element: <SuppliersPage /> },
      { path: '/setting/category', element: <CategoryPage /> },
      { path: '/setting/unit', element: <UnitPage /> },
    ],
  },
  {path:'/auth',
    element: < RegisterPage/>,
    children:[
      {path: '/auth/signup' , element: <RegisterPage/>},
    ]
  },
  {
    path: '/auth',
    element: <LoginPage/>,
    children:[
      {path: '/auth/login' , element: <LoginPage/>}

    ]
  }
];

const generateFlattenRoutes = (routes: RouteObject[]): RouteObject[] => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ children, ...rest }) => [rest, generateFlattenRoutes(children || [])]));
};

export const flattenedRoutes = generateFlattenRoutes(routes);
