import { IText } from "../interfaces";

export interface ITextResponse {
  [key: string]: IText;
}

export interface ITextResponseComplete {
  message: string;
  statusCode: number;
  data: ITextResponse;
}
