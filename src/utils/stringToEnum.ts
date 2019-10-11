import _ from "lodash";
export function stringToConstOnKebab<T extends string>(
  o: T[]
): { [K in T]: string } {
  return o.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = _.kebabCase(currentValue);
    return accumulator;
  }, Object.create(null));
}

export function stringToEnum<T extends string>(o: T[]): { [K in T]: K } {
  return o.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = _.kebabCase(currentValue);
    return accumulator;
  }, Object.create(null));
}
