export default function Section({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <section className="border-gray-200 border-1 rounded-[6px] p-8 mt-4 ">
      {children}
    </section>
  );
}
