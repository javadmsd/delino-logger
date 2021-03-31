export interface ErrorInterface {
  message: string;
  stack: string;
}

export interface ErrorStackInterface {
  message: string;
  stack: string;
  sourceFile: string;
  sourceLines: Array<string>;
  startLine: number | null;
  errorLine: number | null;
}
