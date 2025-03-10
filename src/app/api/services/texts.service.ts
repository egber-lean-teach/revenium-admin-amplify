import TextRepository from "@/app/api/repositories/texts.repository";
import { IDataItem, S3Model } from "@/app/api/models/s3.model";

class TextService {
  private textRepository: TextRepository;
  constructor() {
    this.textRepository = new TextRepository();
  }
  public async getAll() {
    try {
      return await this.textRepository.getTexts();
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
      console.log("textBuId", textById);

      console.log("texts---", texts);
      if (!textById) return { message: "not found" };
      delete texts[id];

      console.log("texts---", texts);
      return await this.textRepository.postText(texts);
    } catch (error: unknown) {
      throw error;
    }
  }
}

const textService = new TextService();
export { textService };
