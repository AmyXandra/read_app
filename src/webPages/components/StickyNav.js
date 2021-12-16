import { useState, useEffect, useRef, useCallback } from 'react';
const StickyNav = (defaultSticky = false) => {
  const [isSticky, setIsSticky] = useState(defaultSticky);
  const navRef = useRef(null);
  const toggleSticky = useCallback(
    ({ top, bottom }) => {
      if (top <= 0 && bottom > 2 * 68) {
        !isSticky && setIsSticky(true);
      } else {
        isSticky && setIsSticky(false);
      }
    },
    [isSticky]
  );
  useEffect(() => {
    const handleScroll = () => {
      toggleSticky(navRef.current.getBoundingClientRect());
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleSticky]);
  return { navRef, isSticky };
};
export default StickyNav;
