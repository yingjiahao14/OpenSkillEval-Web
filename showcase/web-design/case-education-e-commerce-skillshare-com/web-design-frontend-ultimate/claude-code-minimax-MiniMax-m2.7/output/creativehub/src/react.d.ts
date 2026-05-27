declare module 'react' {
  export interface ReactElement<P = any> { type: any; props: P; }
  export type FC<P = {}> = (props: P) => ReactElement | null
  export function useState<T>(initial: T | (() => T)): [T, (v: T) => void]
  export function useRef<T>(initial: T): { current: T }
  export function useEffect(effect: () => void | (() => void), deps?: any[]): void
  export function createElement(type: any, props?: any, ...children: any[]): ReactElement
  export default createElement
}

declare module 'react-dom/client' {
  export function createRoot(container: Element): { render: (el: any) => void }
}

declare module 'react/jsx-runtime' {
  export const jsx: any
  export const jsxs: any
}
