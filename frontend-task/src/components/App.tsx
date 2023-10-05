import React from 'react';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

import PageLayout from './PageLayout';
import PageNotFound from './PageNotFound';
import Dashboard from './Dashboard/Dashboard';
import Blogs from './Blog/Blogs';
import BlogPost from './Blog/BlogPost';



const router = createBrowserRouter( createRoutesFromElements(
  <Route path="/"  element={<PageLayout />}>
      
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="blogs">        
        <Route index element={<Blogs />} />
        <Route path=":post_id" element={<BlogPost />} />
      </Route>
      
      <Route path="*" element={<PageNotFound />} />
  </Route>
));


export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
