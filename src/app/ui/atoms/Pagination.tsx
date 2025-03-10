export default function Pagination(): React.ReactNode {
  return (
    <div className="flex justify-end items-center gap-2">
      <p className="border-[var(--color-gray-light-three)] border-1 p-1 pl-3 pr-3 rounded-[6px] text-[var(--color-text-gray)] cursor-pointer hover:bg-gray-100 transition-colors .4s ease-in text-[.8rem]">
        Previus
      </p>
      <p className="bg-[var(--color-text-gray-hover)] text-white p-1 pl-3 pr-3 rounded-[6px] cursor-pointer">
        1
      </p>
      <p className="border-[var(--color-gray-light-three)] border-1 p-1 pl-3 pr-3 rounded-[6px] text-[var(--color-text-gray)] cursor-pointer hover:bg-gray-100 transition-colors .4s ease-in text-[.8rem]">
        Next
      </p>
    </div>
  );
}
