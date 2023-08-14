import React from 'react';
import Box from '../atoms/Box';

type DividerProps = {
  type?: 'solid' | 'dashed' | 'dotted';
};

const Divider: React.FC<DividerProps> = ({type = 'solid'}) => {
  return <Box width={'100%'} borderWidth={1} height={1} borderStyle={type} borderColor={'$line'} />;
};

export default Divider;
