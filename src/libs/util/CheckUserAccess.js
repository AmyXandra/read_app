'use script';
import { userRoleTypes } from './index';

// roles = array of access that should be able to visit the route
// user roles = array of roles a user has
export const checkUserAccess = (roles, userRoles) => {
  return roles?.some((item) => userRoles?.includes(item) || roles?.includes(userRoleTypes.all));
};
