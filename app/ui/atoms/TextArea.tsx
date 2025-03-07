interface ITextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
}
export default function TextArea({
  ...props
}: ITextAreaProps): React.ReactNode {
  return <textarea {...props}></textarea>;
}
