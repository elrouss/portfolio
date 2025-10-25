declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string;
  }
}

declare module '*.css' {
  const content: Record<string, string>;

  export default content;
}

declare module '*.scss' {
  const content: Record<string, string>;

  export default content;
}

declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.webp';
