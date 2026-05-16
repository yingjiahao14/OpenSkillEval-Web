declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare module 'react-dom/client' {
  import { ReactNode } from 'react';
  export function createRoot(container: Element | DocumentFragment): {
    render(children: ReactNode): void;
    unmount(): void;
  };
}

declare module 'react/jsx-runtime' {
  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
