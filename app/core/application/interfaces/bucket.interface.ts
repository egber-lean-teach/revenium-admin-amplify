export interface IBucket {
  Bucket: string;
  Key: string;
}

export interface IBucketCreate<B> {
  Bucket: string;
  Key: string;
  Body: B;
  ContentType: string;
}
