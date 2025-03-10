interface IVariant {
  default: string;
  second: string;
  third: string;
  fourth: string;
}
interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "default" | "second" | "third" | "fourth";
  children: React.ReactNode;
}

export default function Button({
  variant,
  children,
  ...props
}: IButtonProps): React.ReactNode {
  const classVariant: IVariant = {
    default:
      "bg-transparent border-[var(--color-gray-light-three)] hover:bg-gray-100 text-[1.2rem]",
    second:
      "bg-[var(--color-gray-light-three)] hover:bg-[var(--color-gray-light-hover)] border-none",
    third:
      "bg-[var(--color-text-gray-hover)] hover:bg-[var(--color-text-gray-hover-two)] text-white text-[.9rem] font-bold",
    fourth:
      "bg-transparent border-[var(--color-gray-light-three)] hover:bg-red-400 hover:text-white transition-colors duration-200 ease-in",
  };
  return (
    <button
      className={`border-2 rounded-[6px] p-2 cursor-pointer px-6 flex items-center gap-1 ${classVariant[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
