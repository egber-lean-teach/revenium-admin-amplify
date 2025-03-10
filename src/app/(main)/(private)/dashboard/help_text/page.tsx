import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";

export default function Help_textView() {
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
