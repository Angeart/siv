// tslint:disable-next-line: variable-name
export const Succeeded = true;
export type Succeeded = typeof Succeeded;
// tslint:disable-next-line: variable-name
export const Failed = false;
export type Failed = typeof Failed;

export type MessagedFailed = string;

export type SimpleResult = Succeeded | Failed;
export type MessageOnFailedResult = Succeeded | MessagedFailed;

export function isSucceeded(x: any): x is Succeeded {
  return x === Succeeded;
}

export type LazyComponent = () => Promise<any>;
