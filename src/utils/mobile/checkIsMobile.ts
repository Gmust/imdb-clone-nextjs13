export const checkIsMobile = () => {
  return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent));
};