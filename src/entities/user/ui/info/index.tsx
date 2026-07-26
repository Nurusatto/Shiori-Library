import clsx from "clsx";
import styles from "./style.module.scss";
import type { Profile, AuthStatus } from "@/app/_store/useUserStore";

type prop = {
  profile: Profile | null;
  status: AuthStatus;
};

export const UserInfo = ({ profile, status }: prop) => {
  if (!profile) {
    return null;
  }
  if (status === "loading") {
    return (
      <div className={styles.skeleton}>
        <div className={`${styles.skeletonItem} ${styles.skeletonName}`} />

        <div className={`${styles.skeletonItem} ${styles.skeletonUsername}`} />

        <div className={styles.skeletonBio}>
          <div className={`${styles.skeletonItem} ${styles.skeletonBioLine}`} />
          <div className={`${styles.skeletonItem} ${styles.skeletonBioLine}`} />
          <div className={`${styles.skeletonItem} ${styles.skeletonBioLine}`} />
        </div>
      </div>
    );
  }

  const joinedDate = new Date(profile.createdAt);
  const text = `Member since July 2026 ${joinedDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    },
  )}`;
  return (
    <div className={styles.info}>
      <span className={styles.infoDisplayName}>{profile.displayName}</span>
      <span className={styles.infoUsername}>@{profile.username}</span>
      <div className={styles.infoDetails}>
        <span
          className={clsx(styles.infoBio, !profile.bio && styles.placeholder)}
        >
          {profile.bio || "No bio yet."}
        </span>
        {profile.createdAt && <span>{text}</span>}
      </div>
    </div>
  );
};
