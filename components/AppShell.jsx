'use client';

import Navbar from './navbar';
import RouteLoader from './RouteLoader';

export default function AppShell({ children }) {
  return (
    <>
      <RouteLoader />
      <Navbar />
      {children}
    </>
  );
}
