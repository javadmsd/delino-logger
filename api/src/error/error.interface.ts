export interface ErrorInterface {
  message: string;
  stack: string;
}

export interface ErrorStackInterface {
  message: string;
  stack: string;
  originalFile: string;
  originalLines: Array<any>;
}
