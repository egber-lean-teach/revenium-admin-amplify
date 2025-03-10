// import TextService from "@/app/infrastructure/services/text.service";
import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";

export default async function Help_textView() {
  try {
    const texts = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/api/texts`
    ).then((response) => response.json());
    console.log("texts", texts);
    return (
      <DashboardSectionOrganisms
        categories={["category1"]}
        response={texts}
        subcategories={["subcategory1"]}
      />
    );
  } catch (error: unknown) {
    console.log("texts ---");
    return <div>Not data avaiable. ERROR: {JSON.stringify(error)}</div>;
  }
}
