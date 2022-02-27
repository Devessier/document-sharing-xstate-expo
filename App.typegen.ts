// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    'Assign document has been downloaded to context': 'done.invoke.Share document.Downloading document:invocation[0]';
  };
  internalEvents: {
    'done.invoke.Share document.Downloading document:invocation[0]': {
      type: 'done.invoke.Share document.Downloading document:invocation[0]';
      data: unknown;
      __tip: 'See the XState TS docs to learn how to strongly type this.';
    };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {
    'Download document': 'done.invoke.Share document.Downloading document:invocation[0]';
    'Share document': 'done.invoke.Share document.Sharing document:invocation[0]';
  };
  missingImplementations: {
    actions: never;
    services: 'Share document' | 'Download document';
    guards: never;
    delays: never;
  };
  eventsCausingServices: {
    'Share document':
      | 'Share document'
      | 'done.invoke.Share document.Downloading document:invocation[0]';
    'Download document': 'Share document';
  };
  eventsCausingGuards: {
    'Document has been downloaded': 'Share document';
  };
  eventsCausingDelays: {};
  matchesStates: 'Idle' | 'Downloading document' | 'Sharing document';
  tags: never;
}
