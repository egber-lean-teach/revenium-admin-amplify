import {
  ITextResponse,
  ITextResponseComplete,
} from "@/app/core/application/dto/textResponse";
import { UtilInfrastructure } from "../utils/util.infrastructure";
import { IText } from "@/app/core/application/interfaces/text.interface";
import { IResponse } from "@/app/core/application/dto/response";

class TextService {
  private utilInfrastructure: UtilInfrastructure;

  constructor() {
    this.utilInfrastructure = new UtilInfrastructure();
  }

  public async getTexts(
    page: number = 0,
    size: number = 3
  ): Promise<ITextResponseComplete> {
    console.log("page", page);
    console.log("size", size);
    try {
      const data = await this.utilInfrastructure.get<ITextResponseComplete>(
        `texts?page=${page}&size=${size}`
      );

      return data;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async getCategories(): Promise<string[]> {
    try {
      const response = await this.utilInfrastructure.get<ITextResponseComplete>(
        "texts"
      );
      const categories = Object.entries(response.data).map(
        ([, value]) => value.category
      );
      return categories;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async getSubcategories(): Promise<string[]> {
    try {
      const response = await this.utilInfrastructure.get<ITextResponseComplete>(
        "texts"
      );
      const subCategories = Object.entries(response.data).map(
        ([, value]) => value.subcategory
      );
      return subCategories;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async createText(request: IText): Promise<IResponse<ITextResponse>> {
    try {
      const response = await this.utilInfrastructure.post<
        IText,
        IResponse<ITextResponse>
      >("texts", request);
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async updateText(
    request: IText,
    id: string
  ): Promise<IResponse<ITextResponse>> {
    try {
      const response = await this.utilInfrastructure.put<
        IText,
        IResponse<ITextResponse>
      >("texts", request, id);
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }

  public async deleteText(id: string): Promise<IResponse<ITextResponse>> {
    try {
      const response = await this.utilInfrastructure.delete<
        IResponse<ITextResponse>
      >("texts", id);
      return response;
    } catch (error: unknown) {
      throw error;
    }
  }
}

const textService = new TextService();
export default textService;
