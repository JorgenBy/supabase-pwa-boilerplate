import React from 'react';
import { useMediaQuery } from 'react-responsive';

interface Props {
  message: string;
}
// A div with a white background in the center and a message
const IncorrectAccessPanel: React.FC<Props> = ({ message }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  let containerClass = isTabletOrMobile
    ? 'flex justify-center bg-slate-50/90 m-2 p-2 rounded-lg'
    : 'flex justify-center bg-slate-50/50 m-2 p-2 rounded-lg';

  return <div className={containerClass}>{message}</div>;
};

export default IncorrectAccessPanel;
