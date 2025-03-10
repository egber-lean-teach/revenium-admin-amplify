import { ReactElement } from "react";

interface IManageColumnProps {
  icon: ReactElement;
  text: string;
  onClick: () => void;
}
export default function ManageColumn({
  icon,
  text,
  onClick,
}: IManageColumnProps): React.ReactNode {
  return (
    <div
      className="flex items-center gap-2 border-[var(--color-gray-light-three)] border-1 rounded-[6px] p-1 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <span>{icon}</span>
      <p className="text-[.8rem] font-medium">{text}</p>
    </div>
  );
}
