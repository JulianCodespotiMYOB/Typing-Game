import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='text-gray-300 py-4 px-6 text-center mt-8'>
      <p>&copy; {new Date().getFullYear()} Typing Game. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
