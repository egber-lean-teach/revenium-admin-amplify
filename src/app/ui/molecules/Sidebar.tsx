import { IList } from "@/app/core/application/interfaces/list.interface";
import IconText from "../atoms/IconText";
import ItemList from "../atoms/ItemList";

export default function Sidebar(): React.ReactNode {
  const dataList: IList[] = [
    // { text: "Home", icon: <IconHome />, href: "/" },
    { text: "Helps text", icon: <IconText />, href: "/" },
  ];

  return (
    <div className="w-[18vw] h-[91.7vh] border-gray-200 border-r-1 p-6 bg-[var(--color-gray-light)] flex flex-col justify-between">
      <ul className="flex flex-col gap-2">
        {dataList.map((item, index: number) => (
          <ItemList data={item} key={index} />
        ))}
      </ul>
      <p className="text-[.8rem] text-[var(--color-text-gray)]">
        (C) 2024 All Rights Reserved. Revenium is a registered Trademark and
        ServiceMark of Revenium.
      </p>
    </div>
  );
}
