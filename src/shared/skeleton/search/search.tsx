import styles from "./style.module.scss";

export const SearchSkeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.skeletonInput} />
      <div className={styles.skeletonControls}>
        <div className={styles.skeletonButton} />
        <div className={styles.skeletonButton} />
      </div>
    </div>
  );
};
