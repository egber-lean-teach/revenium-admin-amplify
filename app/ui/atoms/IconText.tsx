import { ReactElement } from "react";

interface IIconTextProps {
  icon?: ReactElement;
  text?: string;
}
export default function IconText({
  icon,
  text,
}: IIconTextProps): React.ReactNode {
  return (
    <div className="bg-[var(--color-gray-light-two)] hover:bg-[var(--color-gray-light-hover)] flex gap-1 items-center rounded-3xl p-2 cursor-pointer">
      {text && <p className="font-bold text-[.9rem]">{text}</p>}
      <span className="font-bold text-[1rem]">{icon}</span>
    </div>
  );
}
