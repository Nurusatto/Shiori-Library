import { useEffect, useRef, useState } from "react";
import { DropMenu } from "./dropMenu";
import clsx from "clsx";
import styles from "./style.module.scss";
import { BookShelf } from "../../model/types";
import { BookInf } from "@/entities/book";
import { useUserBook } from "../../model/query";
import { toast } from "sonner";

export const ButtonPanel = ({
  info,
  status,
}: {
  info: BookInf;
  status: string;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const userBookMutation = useUserBook();
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Проверяем, существует ли ref и был ли клик совершен ВНЕ панели
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    // Слушаем клики только когда меню открыто
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Удаляем обработчик при размонтировании или закрытии
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const handleSelect = async (shelf: BookShelf) => {
    setOpen(false);

    if (status !== "authenticated") {
      toast.error("Please log in to add books to your library.");
      return;
    }

    userBookMutation.mutate({ book: info, shelf });
  };

  return (
    <div className={styles.panel} ref={panelRef}>
      <button
        className={styles.panelButton}
        onClick={() => {
          if (status !== "authenticated") {
            toast.error("Please log in to add books to your library.");
            return;
          }
          setOpen(!open);
        }}
        disabled={userBookMutation.isPending}
      >
        {userBookMutation.isPending ? "Saving..." : "Add to Library"}
      </button>
      <div className={clsx(styles.panelWrap, open && styles.isOpen)}>
        <DropMenu onSelect={handleSelect} />
      </div>
    </div>
  );
};
