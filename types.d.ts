import {JsApi} from './types/js-api/index.d';

export declare global {
  declare module '*.png';

  declare module '*.less' {
    const resource: { [key: string]: string };
    export = resource;
  }

  // eslint-disable-next-line no-unused-vars
  interface Window {
    jsApi: JsApi;
    injectJsApi: any;
  }
}
