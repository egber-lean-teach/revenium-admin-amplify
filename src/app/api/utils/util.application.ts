import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
} from "@aws-sdk/client-s3";
import { injectable } from "tsyringe";
import s3Data from "@/app/api/config/s3";
import { S3Model } from "../models/s3.model";
import { IBucket } from "@/app/core/application/interfaces/bucket.interface";

@injectable()
export default class UtilApplication {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: s3Data.region,
      credentials: {
        accessKeyId: s3Data.access_key_id,
        secretAccessKey: s3Data.secret_access_key,
      },
    });
  }

  public async loadJsonS3(): Promise<S3Model> {
    const params: IBucket = {
      Bucket: s3Data.bucketName,
      Key: s3Data.key,
    };
    console.log("s3Data", s3Data);
    try {
      const command = new GetObjectCommand(params);
      const data = await this.s3Client.send(command);

      if (!data.Body) {
        throw new Error("No data found in S3 object");
      }

      const jsonData = await data.Body.transformToString();
      return JSON.parse(jsonData);
    } catch (error: unknown) {
      console.error("Error loading JSON from S3:", error);
      throw new Error("Failed to load JSON from S3");
    }
  }

  public async saveJsonS3(newData: S3Model): Promise<{ message: string }> {
    const params: PutObjectCommandInput = {
      Bucket: s3Data.bucketName,
      Key: s3Data.key,
      Body: JSON.stringify(newData),
      ContentType: "application/json",
      ACL: "public-read",
    };

    try {
      const command = new PutObjectCommand(params);
      await this.s3Client.send(command);
      return {
        message: "Create text success",
      };
    } catch (error: unknown) {
      console.log({
        message: "Error to create",
      });
      throw new Error(`Error with the saveJsonS3 ${error}`);
    }
  }

  public static verifyAllParams(...fields: (number | string)[]): boolean {
    return fields.every((field) => field);
  }

  public static generateKey(
    category: string,
    subcategory: string,
    name: string
  ): string {
    return `${category}Category_${subcategory}Subcategory_${name}Name_${category[0]}${subcategory[0]}${name[0]}Combination`;
  }

  public static verifySpecialSymbols(value: string): boolean {
    const specialSymbols: string[] = [
      ".",
      ",",
      ";",
      ":",
      "!",
      "?",
      "'",
      '"',
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "...",
      "-",
      "–",
      "—",
      "«",
      "»",
      "‘",
      "’",
      "“",
      "”",
      "+",
      "-",
      "*",
      "/",
      "=",
      "≠",
      "<",
      ">",
      "≤",
      "≥",
      "%",
      "√",
      "∞",
      "∫",
      "∑",
      "π",
      "°",
      "±",
      "$",
      "€",
      "£",
      "¥",
      "¢",
      "₹",
      "₽",
      "@",
      "#",
      "&",
      "|",
      "\\",
      "~",
      "^",
      "_",
      "§",
      "¶",
      "©",
      "®",
      "™",
      "←",
      "→",
      "↑",
      "↓",
      "↔",
      "↕",
      "↨",
      "⇐",
      "⇒",
      "⇑",
      "⇓",
      "♩",
      "♪",
      "♫",
      "♬",
      "♭",
      "♮",
      "♯",
      "♔",
      "♕",
      "♖",
      "♗",
      "♘",
      "♙",
      "♚",
      "♛",
      "♜",
      "♝",
      "♞",
      "♟",
      "♠",
      "♣",
      "♥",
      "♦",
      "☉",
      "☽",
      "☿",
      "♀",
      "♁",
      "♂",
      "♃",
      "♄",
      "♅",
      "♆",
      "♇",
      "😀",
      "😂",
      "❤️",
      "👍",
      "🔥",
      "✨",
      "🎉",
      "🚀",
      "🌍",
      "🍕",
      "&nbsp;",
      "&copy;",
      "&reg;",
      "&trade;",
      "&amp;",
      "&lt;",
      "&gt;",
      "&quot;",
      "&apos;",
      "★",
      "☆",
      "☑",
      "☐",
      "✂",
      "✉",
      "✈",
      "✏",
      "✍",
      "✓",
      "✗",
      "☦",
      "☪",
      "☮",
      "☯",
      "✝",
    ];

    const verifiedValue = value
      .split("")
      .map((letter) => specialSymbols.includes(letter));

    if (verifiedValue.includes(true)) return true;
    return false;
  }

  public static removeSpace(...values: string[]): string[] {
    const newValues: string[] = values.map((value) =>
      value.split(" ").join("_")
    );
    return newValues;
  }
}
