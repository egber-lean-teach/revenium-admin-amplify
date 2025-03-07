export interface IModalMessage {
  message: string;
  code: number;
  status: boolean;
}

export const initialModalMessage: IModalMessage = {
  message: "",
  code: 0,
  status: false,
};
