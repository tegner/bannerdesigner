export const decode = (hash: string) => window.atob(hash);
export const encode = (str: string) => window.btoa(str);
