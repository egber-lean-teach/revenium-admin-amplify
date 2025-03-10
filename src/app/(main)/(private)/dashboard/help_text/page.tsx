import TextService from "@/app/infrastructure/services/text.service";
import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";
export default async function Help_textView() {
  try {
    const texts = await TextService.getTexts();
    const categories = await TextService.getCategories();
    const subcategories = await TextService.getSubcategories();
    console.log("texts", texts);
    console.log("categories", categories);
    console.log("subcategories", subcategories);
    return (
      <DashboardSectionOrganisms
        categories={categories}
        response={texts}
        subcategories={subcategories}
      />
    );
  } catch (error: unknown) {
    return <div>Not data avaiable. ERROR: {JSON.stringify(error)}</div>;
  }
}
