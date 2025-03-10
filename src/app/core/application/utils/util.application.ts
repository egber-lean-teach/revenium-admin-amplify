export class UtilApplicationInternal {
  public static firstFourLetter(value: string): string {
    const [letter1, letter2, letter3, letter4] = value;
    return `${letter1}${letter2}${letter3}${letter4}`;
  }

  public static async copyText(value: string): Promise<boolean | undefined> {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch (error: unknown) {
      console.log({
        message: error,
      });
    }
  }

  public static verifySpace(value: string): boolean {
    const separateValue = value.split("");
    const verify = separateValue.find((letter: string) => {
      if (letter === " ") return true;
    });
    if (!verify) return false;
    return true;
  }

  public static generateKey(
    category: string,
    subcategory: string,
    name: string
  ): string {
    const generate: string = `${category}Category_${subcategory}Subcategory_${name}Name_${category[0]}${subcategory[0]}${name[0]}Combination`;
    return generate;
  }
}
