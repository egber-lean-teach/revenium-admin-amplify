export interface IDataItem {
  category: string;
  subcategory: string;
  name: string;
  id: string;
  description: string;
}

export interface S3Model {
  [key: string]: IDataItem;
}
