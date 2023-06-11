import {useState} from 'react';

const useNotificationBadge = () => {
  const [showBadge, setShowBadge] = useState(false);

  const toggleShowBadge = () => {
    setShowBadge(!showBadge);
  };

  return {
    showBadge,
    toggleShowBadge,
  };
};

export default useNotificationBadge;
