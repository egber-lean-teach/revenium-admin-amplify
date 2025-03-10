import TextService from "@/app/infrastructure/services/text.service";
import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";

export default async function Help_textView() {
  try {
    const texts = await TextService.getTexts();
    console.log("texts", texts);
  } catch (error: unknown) {
    return <div>error {JSON.stringify(error)}</div>;
  }
  return (
    <DashboardSectionOrganisms
      categories={["category1"]}
      response={{
        message: "",
        statusCode: 0,
        data: {
          id1: {
            category: "category1",
            subcategory: "subcategory1",
            name: "name1",
            id: "id1",
            description: "description1",
          },
        },
      }}
      subcategories={["subcategory1"]}
    />
  );
}
