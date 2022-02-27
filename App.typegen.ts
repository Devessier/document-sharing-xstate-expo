// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    'Assign document has been downloaded to context': 'done.invoke.Share document.Downloading document:invocation[0]';
    'Assign document is cached to context': 'done.invoke.Share document.Getting document from cache:invocation[0]';
  };
  internalEvents: {
    'done.invoke.Share document.Downloading document:invocation[0]': {
      type: 'done.invoke.Share document.Downloading document:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'done.invoke.Share document.Getting document from cache:invocation[0]': {
      type: 'done.invoke.Share document.Getting document from cache:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'Download document': 'done.invoke.Share document.Downloading document:invocation[0]';
    'Share document': 'done.invoke.Share document.Sharing document:invocation[0]';
    'Get document from cache': 'done.invoke.Share document.Getting document from cache:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services:
      | 'Share document'
      | 'Download document'
      | 'Get document from cache';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    'Share document':
      | 'Share document'
      | 'done.invoke.Share document.Downloading document:invocation[0]';
    'Download document': 'Share document';
    'Get document from cache': 'xstate.init';
  };
  eventsCausingGuards: {
    'Document is cached': 'Share document';
    'Document has been downloaded': 'Share document';
  };
  eventsCausingDelays: {};
  matchesStates:
    | 'Idle'
    | 'Downloading document'
    | 'Sharing document'
    | 'Getting document from cache';
  tags: never;
}
