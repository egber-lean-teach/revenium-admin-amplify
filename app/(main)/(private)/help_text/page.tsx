import { TextService } from "@/app/infrastructure/services";
import { ManageUser } from "@/app/ui/atoms";
import { DashboardSectionOrganisms } from "@/app/ui/organisms";

export const dynamic = "force-dynamic";

export default async function DashboardView() {
  const response = await TextService.getTexts();
  const categories = await TextService.getCategories();
  const subcategories = await TextService.getSubcategories();

  console.log(
    "categories, response, subcategories",
    response,
    categories,
    subcategories
  );

  if (response.statusCode >= 400 || !categories || !subcategories) {
    return (
      <div className="flex justify-center items-center">
        Error to get text, categories or subcategories!
      </div>
    );
  }

  return (
    <ManageUser>
      <DashboardSectionOrganisms
        response={response}
        categories={categories}
        subcategories={subcategories}
      />
    </ManageUser>
  );
}
