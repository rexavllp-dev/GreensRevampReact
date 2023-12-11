import React from 'react';
import * as Icons from '../components/customicons';

const IconRenderer = ({ iconName, color }) => {
  const Icon = Icons[iconName];  

  // Return the corresponding icon component if it exists
  if (Icon) {
    return <Icon color={color}/>;
  }

  // Handle the case where the icon does not exist
  return null; // You can return a default icon or a placeholder here if needed
};

export default IconRenderer