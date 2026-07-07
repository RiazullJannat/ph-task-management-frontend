export type TSearchParams = Promise<{
    [key: string]: string | string[] | number | boolean | undefined;
}>;

export interface Query {
  [key: string]: string | string[] | number | boolean | undefined;
}