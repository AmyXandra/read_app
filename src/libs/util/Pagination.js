export const goToPage = (paginationData, nextPage, paginationType = 'next') => {
  const scrollToTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };

  let { totalPages, page: currentPage } = paginationData;
  if (paginationType === 'next') {
    if (currentPage <= totalPages) {
      nextPage(currentPage + 1);
    }
  }
  if (paginationType === 'prev') {
    if (currentPage > 0) {
      nextPage(currentPage - 1);
    }
  }

  scrollToTop();
};
