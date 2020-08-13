export function cleanCategories(targetArray: any, key: string) {
  return targetArray.filter(
    (v, i, a) => a.findIndex((t) => t[key] === v[key]) === i
  );
}
