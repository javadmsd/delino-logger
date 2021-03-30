export interface ErrorInterface {
  message: string;
  stack: string;
}

export interface ErrorStackInterface {
  message: string;
  stack: string;
  orginalFile: string;
  orginalLines: Array<any>;
}
