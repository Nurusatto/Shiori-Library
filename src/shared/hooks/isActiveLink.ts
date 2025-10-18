export const isActiveLink = (linkPath: string, currentPath: string) => {
  if (linkPath === "/") return currentPath === "/";
  return currentPath.startsWith(linkPath);
};
