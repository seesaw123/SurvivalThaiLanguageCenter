import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// Site-wide link: same as React Router's <Link>, but page changes animate with the
// browser's View Transitions API (see the ::view-transition rules in styles.css).
// Browsers without support just switch pages instantly.
export const Link = forwardRef(function Link(props, ref) {
  return <RouterLink ref={ref} viewTransition {...props} />;
});
