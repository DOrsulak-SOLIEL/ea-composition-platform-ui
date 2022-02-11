
export type comparator= (x: any, y: any) => number;
export const dateComparator: comparator = (x, y) => new Date(x).getTime() - new Date(y).getTime();
export const strComparator: comparator = (x, y) => (x || '').trim().localeCompare((y || '').trim());
export const numComparator: comparator = (x, y) => Number(x) -  Number(y);
