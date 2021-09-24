import { FunctionComponent } from 'react';
import Navbar from './Navbar';

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
