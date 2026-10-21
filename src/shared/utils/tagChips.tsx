import { useMemo } from "react";

interface SubjectChipsProps {
  subjects: string[];
  className?: string;
  onSelectSubject?: (tag: string) => void;
}

export const SubjectChips: React.FC<SubjectChipsProps> = ({
  subjects,
  onSelectSubject,
  className,
}) => {
  const parsedTags = useMemo(() => {
    const uniqueTags = new Set<string>();

    subjects.forEach((subject) => {
      // Убираем точки на конце строки и разбиваем по '--'
      const parts = subject.replace(/\.+$/, "").split("--");

      parts.forEach((part) => {
        const trimmed = part.trim();
        if (trimmed) {
          uniqueTags.add(trimmed);
        }
      });
    });

    return Array.from(uniqueTags);
  }, [subjects]);

  if (!parsedTags.length) return null;

  return (
    <>
      {parsedTags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectSubject?.(tag)}
          className={className}
        >
          #{tag}
        </button>
      ))}
    </>
  );
};
