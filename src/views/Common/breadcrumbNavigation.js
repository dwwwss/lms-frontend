// Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  return (
    <div>
      {pathSegments.map((segment, index) => (
        <span key={segment}>
          <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`}>{segment}</Link>
          {index < pathSegments.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
