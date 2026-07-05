/// <reference types="vite/client" />

declare module '*.scss';

declare module '*.module.scss' {
  const classes: Record<string, string>;
  export default classes;
}
