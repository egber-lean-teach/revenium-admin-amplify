import TextRepository from "@/app/api/repositories/texts.repository";
import { IDataItem, S3Model } from "@/app/api/models/s3.model";
import { ITextResponse } from "@/app/core/application/dto/textResponse";

class TextService {
  private textRepository: TextRepository;
  constructor() {
    this.textRepository = new TextRepository();
  }
  public async getAll(
    page: number = 0,
    size: number = 3
  ): Promise<[ITextResponse, number]> {
    try {
      const data = await this.textRepository.getTexts();
      const dataArray = Object.entries(data).map(([key, value]) => {
        return { key, value };
      });
      const dataPaginated = dataArray.slice(page * size, page * size + size);
      const originalFormat = dataPaginated.reduce(
        (acc: ITextResponse, { key, value }) => {
          acc[key] = value;
          return acc;
        },
        {}
      );
      return [originalFormat, dataArray.length];
    } catch (error: unknown) {
      throw error;
    }
  }

  public async postText(
    newText: IDataItem
  ): Promise<{ message: string } | undefined> {
    const { id } = newText;
    if (!id) return;

    try {
      const textById = await this.textRepository.getTextById(id);
      if (textById) return { message: "found" };

      const texts: S3Model = await this.textRepository.getTexts(); // Get all texts
      texts[id] = newText; // Create new text
      return await this.textRepository.postText(texts);
    } catch (error: unknown) {
      throw error;
    }
  }

  public async putText(newText: IDataItem): Promise<{ message: string }> {
    const { id } = newText;
    try {
      const texts = await this.textRepository.getTexts(); // Get all texts
      const textFoundById = await this.textRepository.getTextById(id);
      if (!textFoundById) return { message: "not found" };

      texts[id] = newText; // Change text by id for new text
      return await this.textRepository.postText(texts);
    } catch (error: unknown) {
      throw error;
    }
  }

  public async deleteText(id: string): Promise<{ message: string }> {
    try {
      const texts = await this.textRepository.getTexts();
      const textById = await this.textRepository.getTextById(id);

      if (!textById) return { message: "not found" };
      delete texts[id];
      return await this.textRepository.postText(texts);
    } catch (error: unknown) {
      throw error;
    }
  }
}

const textService = new TextService();
export { textService };
