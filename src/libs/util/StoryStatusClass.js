'use strict';

export const storyStatusClass = (status) => {
  switch (status) {
    case 'draft':
      return 'bg-gray-200 text-gray-800';
    case 'submitted':
      return 'bg-gray-200 text-gray-800';
    case 'inreview':
      return 'bg-yellow-200 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'editreview':
      return 'bg-indigo-100 text-indigo-800';
    case 'unpublished':
      return 'bg-blue-100 text-blue-800';
    case 'converted':
      return 'bg-blue-100 text-blue-800';
    default:
      break;
  }
};
