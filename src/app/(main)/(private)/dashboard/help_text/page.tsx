import TextService from "@/app/infrastructure/services/text.service";
import ProviderPagination from "@/app/ProvidePagination";
import DashboardSectionOrganisms from "@/app/ui/organisms/DashboardSection.organisms";

interface IHelp_textViewProps {
  searchParams: {
    page?: string;
    totalPage?: string;
    name?: string;
  };
}
export const generateMetadata = async ({
  searchParams,
}: IHelp_textViewProps): Promise<{ title: string; description: string }> => {
  const page: number = parseInt(searchParams?.page || "1");

  return {
    title: `Help Texts - Page ${page}`,
    description: `Revenium - Admin`,
  };
};

export default async function Help_textView({
  searchParams,
}: IHelp_textViewProps) {
  try {
    const page: number = searchParams.page ? parseInt(searchParams.page) : 1;
    const size: number = searchParams.totalPage
      ? parseInt(searchParams.totalPage)
      : 3;

    const texts = await TextService.getTexts(page, size);
    const categories = await TextService.getCategories();
    const subcategories = await TextService.getSubcategories();

    console.log("texts", texts.length);

    if (!texts || !categories || !subcategories) {
      return <div>No data available.</div>;
    }

    return (
      <ProviderPagination pagination={{ page, totalPage: texts.length }}>
        <DashboardSectionOrganisms
          categories={categories}
          response={texts}
          subcategories={subcategories}
        />
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
