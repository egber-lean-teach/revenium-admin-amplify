import TextService from "@/app/infrastructure/services/text.service";
import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";

export default async function Help_textView() {
  try {
    const texts = await TextService.getTexts();
    console.log("texts", texts);
    return (
      <DashboardSectionOrganisms
        categories={["category1"]}
        response={
          texts.data
            ? texts
            : {
                data: {},
                message: "No data available",
                statusCode: 404,
              }
        }
        subcategories={["subcategory1"]}
      />
    );
  } catch (error: unknown) {
    return <div>Not data avaiable. ERROR: {JSON.stringify(error)}</div>;
  }
}
