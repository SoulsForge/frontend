export const generateOptions = (enumObject: Record<string, string>): string[] => {
  return Object.entries(enumObject).map(([_, value]) => (value));
};