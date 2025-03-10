import { IS3ClientRequest } from "@/app/core/application/dto/s3ClientRequest";

const s3Data: IS3ClientRequest = {
  bucketName: process.env.NEXT_PUBLIC_BUCKET_NAME_AWS || "",
  key: process.env.NEXT_PUBLIC_KEY_AWS || "",
  region: process.env.NEXT_PUBLIC_REGION_AWS || "",
  secret_access_key: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY_AWS || "",
  access_key_id: process.env.NEXT_PUBLIC_ACCESS_KEY_ID_AWS || "",
};

export default s3Data;
