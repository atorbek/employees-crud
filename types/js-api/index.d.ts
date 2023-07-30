type RestCallOptions = {
  method?: string;
  headers?: { [key: string]: string };
  body?: string | { [key: string]: string };
  responseType?:
  | ''
  | 'arraybuffer'
  | 'blob'
  | 'document'
  | 'json'
  | 'text'
  | 'moz-chunked-arraybuffer'
  | 'ms-stream';
};

type MakeOptions = RestCallOptions & { url: string }

type JsonOptions = MakeOptions;

type MakePromiseReject = {
  status: number,
  statusText: string,
  responseText: string
}

type JsonPromiseReject = MakePromiseReject;

type Callback = () => void;

type EventsAction = (callback: Callback) => void

type TextWithSyntaxHighlighted = { text: string; lang: string };

type HyperLink = { text: string; url: string };

type TimeInterval = {
  length: number;
  interval: 'HOUR' | 'MINUTE' | 'SECOND' | 'DAY' | 'WEEK'
};

type AttributeOrParamMap = {
  [attrCode: string]:
  | string
  | number
  | TextWithSyntaxHighlighted
  | string[]
  | HyperLink
  | TimeInterval;
};

type FormType =
| 'addForm'
| 'editForm'
| 'objectCard'
| 'changeStateForm'
| 'changeResponsibleForm'
| 'changeCaseForm'
| 'changeAssociationForm'
| 'quickAddForm'
| 'quickEditForm'
| 'addCommentForm'
| 'editCommentForm'
| 'addFileForm'
| 'editFileForm'
| ' userEventActionForm';

// TODO class was copied from https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/stompjs/index.d.ts
declare class Frame {
  command: string;
  headers: {};
  body: string;
  constructor(command: string, headers?: {}, body?: string);

  toString(): string;
  static sizeOfUTF8(s: string): number;
  static unmarshall(datas: any): any;
  static marshall(command: string, headers?: {}, body?: string): any;
}

declare class FilterFormBuilder {
  setAttributeList(params: { useRestriction: boolean }): this;

  setAttributeTree(
    params:
    | {
      useContextRestriction: boolean;
      restriction: { [fqn: string]: string | string[] };
    }
    | {}
  ): this;

  openForm(): Promise<{[key: string]: string} | null>;
}

declare class EventActionExecutor {
  setSubject(uuid: string): this;

  setSubjects(uuids: string[]): this;

  execute(): Promise<{ eventActionType: 'async' | 'sync' } | Error | null>;
}

declare class UtilsParams {
  ignoreCase(): this;

  limit(limit: number): this;

  offset(offset: number): this;

  attrs(attributes: string[]): this;
}

export interface JsApi {
  findContentCode: () => string;
  findApplicationCode: () => string;
  extractSubjectUuid: () => string | null;
  registerAttributeToModification: (
    attributeCode: string,
    resultCallback: () => any
  ) => void;
  isAddForm: () => boolean;
  isEditForm: () => boolean;
  isOnObjectCard: () => boolean;
  getCurrentUser: () => { uuid: string };
  getCurrentLocale: () => string;
  getAppBaseUrl: () => string;
  getAppRestBaseUrl: () => string;
  getViewMode: () => string;
  restCall: <T>(restOfTheUrl: string, options: RestCallOptions) => Promise<T>;
  restCallModule: <T>(
    moduleCode: string,
    functionName: string,
    ...args: Array<number | string | boolean | { [key: string]: any }>
  ) => Promise<T>;

  commands: {
    selectObjectDialog: (
      classFqn: string,
      presentAttributesGroupCode: string
    ) => Promise<string | null>;
    editObject: (uuid: string) => void;
    quickAddObject: (
      classFqn: string,
      formCode: string,
      properties: { [key: string]: any },
      callback: (uuid: string, exception: Error) => void
    ) => void;
    quickEditObject: (
      uuid: string,
      formCode: string,
      properties: { [key: string]: any },
      callback: (uuid: string, exception: Error) => void
    ) => void;
  };

  requests: {
    make: (options: MakeOptions) => Promise<string | MakePromiseReject>;
    json: (options: JsonOptions) => Promise<any | JsonPromiseReject>;
  };

  urls: {
    base: () => string;
    objectCard: (uuid: string) => string;
    objectEditForm: (uuid: string) => string;
    objectAddForm: (fqn: string) => string;
    goTo: (link: string) => void;
  };

  configuration: {
    byContentCode: (
      moduleCode: string,
      ...args: any
    ) => Promise<any | JsonPromiseReject>;
    byDefault: (
      moduleCode: string,
      ...args: any
    ) => Promise<any | JsonPromiseReject>;
  };

  ws: {
    subscribe: (
      destination: string,
      callback: (message: Frame) => void
    ) => void;
    unsubscribe: (destination: string) => void;
    connect: (callback: () => void) => void;
    disconnect: () => void;
    send: (destination: string, message: string) => void;
  };

  events: {
    addFieldChangeListener: (
      attrCode: string,
      callback: (result: AttributeOrParamMap) => void
    ) => void;
    addSubjectChangeListener: (
      attrCode: string,
      callback: (result: AttributeOrParamMap) => void
    ) => void;
    onFullscreenDisabled: EventsAction;
    onFullscreenEnabled: EventsAction;
    onContentHide: EventsAction;
    onContentShow: EventsAction;
    onUpdatePermissions: EventsAction;
  };

  forms: {
    getValues: () => Promise<{ [key: string]: string }>;
    changeState: (
      uuid: string,
      states: string[],
      requiredConfirm?: boolean
    ) => Promise<null | undefined | AttributeOrParamMap>;
    changeResponsible: (
      uuid: string
    ) => Promise<null | undefined | AttributeOrParamMap>;
    // TODO describe type for argument "context"
    getFilterFormBuilder(context: { [key: string]: string }): FilterFormBuilder;
    cancel: () => void;
    registerValidator: (validationCallback: () => boolean) => void;
    getType: () => FormType;
    isModal: () => boolean;
  };

  eventActions: {
    getEventActionExecutor: (eventUuid: string) => EventActionExecutor;
  };

  contents: {
    getParameters: () => Promise<AttributeOrParamMap>;
    getInitialHeight: () => number;
    getHeight: () => number;
    setHeight: (height: number) => Promise<{}>;
  };

  utils: {
    buildParams: () => UtilsParams;
    find: (uuid: string, attributes: string[], params?: UtilsParams) => Promise<AttributeOrParamMap[]>;
    findFirst: (uuid: string, attributes: string[], params?: UtilsParams) => Promise<AttributeOrParamMap>;
    edit: (uuid: string, attributes: string[], params?: UtilsParams) => Promise<AttributeOrParamMap>;
    create: (fqn : String, attributes : String[], params ?: UtilsParams) => Promise<AttributeOrParamMap>;
    get: (uuid : String, params ?: UtilsParams) => Promise<AttributeOrParamMap>;
    delete: (uuid : String) => Promise<string>
  };

  listdata: {
    // TODO describe type for argument "context"
    describeFiltration: (context: { [key: string]: string }) => Promise<string>
  }
}
