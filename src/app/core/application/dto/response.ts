export interface IResponse<D> {
  message: string;
  statusCode: number;
  data: D;
}
