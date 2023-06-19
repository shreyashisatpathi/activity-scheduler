import React, { ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer';
import ActivityModal from '../modals/activityModal';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 container mx-auto px-4  h-calc(100vh-6.75rem) pt-10">
        <div className="flex">{children}</div>
        <ActivityModal />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
