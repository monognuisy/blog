const ascendingSortFn = <T>(a: T, b: T) => (a > b ? -1 : 1);
const descendingSortFn = <T>(a: T, b: T) => (a < b ? -1 : 1);

export { ascendingSortFn, descendingSortFn };
