import { Metadata, ResolvingMetadata } from "next";
import TextService from "@/app/infrastructure/services/text.service";
import ProviderPagination from "@/app/ProvidePagination";
import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";
import ManageUser from "@/app/ui/atoms/ManageUser";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log("parent", parent);
  const searchParamsResolved = await searchParams;
  const page = parseInt((searchParamsResolved.page as string) || "0");
  return {
    title: `Help Texts - Page ${page}`,
    description: `Revenium - Admin`,
  };
}

export default async function Help_textView({ searchParams }: Props) {
  try {
    const searchParamsResolved = await searchParams;
    const page: number = searchParamsResolved.page
      ? parseInt(searchParamsResolved.page as string)
      : 0;
    const size: number = searchParamsResolved.totalPage
      ? parseInt(searchParamsResolved.totalPage as string)
      : 20;
    const texts = await TextService.getTexts(page, size);
    const categories = await TextService.getCategories();
    const subcategories = await TextService.getSubcategories();

    console.log("categories", categories);
    console.log("subcategories", subcategories);

    if (!texts || !categories || !subcategories) {
      return <div>No data available.</div>;
    }

    return (
      <ProviderPagination pagination={{ page, totalPage: texts.length }}>
        <ManageUser>
          <DashboardSectionOrganisms
            categories={categories}
            response={texts}
            subcategories={subcategories}
          />
        </ManageUser>
      </ProviderPagination>
    );
  } catch (error: unknown) {
    return (
      <div>
        No data available. Please try again later. {JSON.stringify(error)}
      </div>
    );
  }
}
