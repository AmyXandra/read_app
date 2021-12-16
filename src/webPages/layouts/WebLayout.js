import React from 'react';
import WebNavbar from '../components/navigation/WebNavbar';
import WebFooter from '../components/navigation/WebFooter';

export default function WebLayout({ noFooter, children }) {
  return (
    <div>
      <WebNavbar />
      {children}
      {!noFooter && <WebFooter />}
    </div>
  );
}
