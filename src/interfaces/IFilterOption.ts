/**
 * @Created 2024-10-07
 * @Brief Object for a general filter option.
 */

export interface IFilterOption<T> {
  label: string;
  value: T;
  toggled: boolean;
}
