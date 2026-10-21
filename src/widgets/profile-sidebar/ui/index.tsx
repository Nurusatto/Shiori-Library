"use client";

import { Avatar } from "@/entities/user/ui/avatar";

import { UserInfo } from "@/entities/user";
import { useUserStore } from "@/app/_store/useUserStore";
import { useShallow } from "zustand/react/shallow";

import styles from "./style.module.scss";

export const ProfileSideBar = () => {
  const { profile, status } = useUserStore(
    useShallow((state) => ({
      profile: state.profile,
      status: state.status,
    })),
  );

  return (
    <aside className={styles.profile}>
      <Avatar size="hero" avatar={profile?.avatar} priority={true} />
      <UserInfo profile={profile} status={status} />
    </aside>
  );
};
