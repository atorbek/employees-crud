export declare global {
  declare module '*.png';

  declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
  }
}
