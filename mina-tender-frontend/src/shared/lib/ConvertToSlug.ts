export function convertToSlug(str: string) {
  const regex = /[^a-zA-Z0-9-\s]/g;
  let filteredString = str.replace(regex, "");
  filteredString = filteredString.replace(/\s+/g, "-");
  filteredString = filteredString.toLowerCase()
  return filteredString;
}
