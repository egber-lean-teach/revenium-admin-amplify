import { IS3ClientRequest } from "@/app/core/application/dto";

const s3Data: IS3ClientRequest = {
  bucketName: process.env.BUCKET_NAME_AWS || "",
  key: process.env.KEY_AWS || "",
  region: process.env.REGION_AWS || "",
  secret_access_key: process.env.SECRET_ACCESS_KEY_AWS || "",
  access_key_id: process.env.ACCESS_KEY_ID_AWS || "",
};

export default s3Data;
