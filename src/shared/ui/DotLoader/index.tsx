import styles from "./style.module.scss";

export const LoadingDots = () => {
  return (
    <div className={styles.loadingDots}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
