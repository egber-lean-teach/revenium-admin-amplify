interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}
export default function Input({ ...props }: IInputProps): React.ReactNode {
  return (
    <input
      className="focus:outline-0 border-[var(--color-gray-light-three)] border-1 rounded-[6px] p-2"
      {...props}
    />
  );
}
