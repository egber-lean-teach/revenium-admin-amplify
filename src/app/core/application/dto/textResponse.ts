import { IText } from "../interfaces/text.interface";

export interface ITextResponse {
  [key: string]: IText;
}

export interface ITextResponseComplete {
  message: string;
  statusCode: number;
  data: ITextResponse;
  length: number;
}
