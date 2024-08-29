import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';

const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <main className='pt-4'> {children} </main>
    </>
  );
};

export default PageLayout;
