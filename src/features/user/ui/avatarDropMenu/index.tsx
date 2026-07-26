"use client";

import { Avatar } from "@/entities/user/ui/avatar";
import styles from "@/features/user/ui/avatarDropMenu/style.module.scss";
import { useState, useRef, useEffect } from "react";
import { useUserStore } from "@/app/_store/useUserStore";
import { useRouter } from "next/navigation";
import { DROP_MENU_LINKS } from "@/shared/config/navigation";
import clsx from "clsx";
import Link from "next/link";
import { logoutAction } from "@/shared/utils/auth";
import { AvatarSize } from "@/entities/user/model/type";

type props = {
  size?: AvatarSize;
  setOpen?: (open: boolean) => void;
  open?: boolean;
  priority?: boolean;
};

export const AvatarDropMenu = ({ size, setOpen, open, priority }: props) => {
  const router = useRouter();
  const { profile, status, logOut } = useUserStore();
  const currentAvatar = profile?.avatar ?? null;
  const [active, setActive] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(false);
    };

    if (active) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  const actionsMap: Record<string, () => void | Promise<void>> = {
    logout: async () => {
      logOut();
      await logoutAction();
    },
  };

  const handleActionClick = (id: string) => {
    const action = actionsMap[id];
    if (action) {
      action();
      if (setOpen) setOpen(!open);
      setActive(false);
    }
  };

  const toggleMenu = () => {
    if (status === "loading") return;
    setActive((prev) => !prev);
  };

  const renderDropMenu = () => {
    return (
      <div
        className={clsx(styles.AvatarMenu, active && styles.isActive)}
        onClick={(e) => e.stopPropagation()}
      >
        {status === "loading" && (
          <div className={styles.loadingState}>
            <span className={styles.spinner} />
            Загрузка...
          </div>
        )}

        {status === "unauthenticated" && (
          <div className={styles.authPrompt}>
            <button
              className={styles.loginBtn}
              onClick={() => {
                setActive(false);
                if (setOpen) setOpen(!open);
                router.push("/login");
              }}
            >
              Войти
            </button>
          </div>
        )}

        {status === "authenticated" && (
          <>
            <div className={styles.userInfo}>
              <p className={styles.userName}>
                {profile?.displayName || "Пользователь"}
              </p>
              {profile?.username && (
                <p className={styles.userHandle}>@{profile.username}</p>
              )}
            </div>

            <div className={styles.divider} />

            <ul className={styles.menuList}>
              {DROP_MENU_LINKS.map((item) => (
                <li key={item.id} className={styles.menuItem}>
                  {item.isAction ? (
                    <button
                      type="button"
                      className={clsx(
                        styles.menuLink,
                        item.id === "logout" && styles.danger,
                      )}
                      onClick={() => handleActionClick(item.id)}
                    >
                      {item.label}
                    </button>
                  ) : item.href ? (
                    <Link
                      href={item.href}
                      className={styles.menuLink}
                      onClick={() => {
                        setActive(false);
                        if (setOpen) setOpen(!open);
                      }}
                    >
                      {item.label}
                    </Link>
                  ) : null}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      ref={menuRef}
      className={clsx(
        styles.AvatarWrapper,
        status === "loading" && styles.disabled,
      )}
    >
      <button
        type="button"
        className={clsx(styles.AvatarTrigger, active && styles.active)}
        onClick={toggleMenu}
        aria-label="Меню пользователя"
      >
        <Avatar
          avatar={currentAvatar}
          shape="circle"
          size={size}
          priority={priority}
        />
      </button>

      {renderDropMenu()}
    </div>
  );
};
