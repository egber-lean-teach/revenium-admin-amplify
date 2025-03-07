export default function ModalContent({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="modal absolute top-[40px] right-[20px] p-2 bg-white shadow-2xl border-[var(--color-gray-light-three)] border-1 rounded-[6px]">
      {children}
    </div>
  );
}
