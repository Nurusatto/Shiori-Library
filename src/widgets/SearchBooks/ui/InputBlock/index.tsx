import clsx from "clsx";
import { InputProp } from "../../model/type";
import styles from "./style.module.scss";

export const InputBlock = ({ state, setState, mode, setMode }: InputProp) => {
  return (
    <div className={styles.InputBlock}>
      <h3 className={styles.InputMessage}>
        Please enter at least 3 letters to search
      </h3>
      <input
        placeholder={
          mode === "q"
            ? "Search books..."
            : mode === "author"
              ? "Search authors..."
              : "Search subjects..."
        }
        className={styles.Input}
        autoComplete="off"
        value={state}
        onChange={(e) => setState(e.target.value)}
        name="Input"
      />
      <div className={styles.InputAction}>
        <button
          type="button"
          className={clsx(styles.InputBtn, mode === "q" ? styles.isActive : "")}
          onClick={() => setMode("q")}
        >
          Books
        </button>
        <button
          type="button"
          className={clsx(
            styles.InputBtn,
            mode === "author" ? styles.isActive : "",
          )}
          onClick={() => setMode("author")}
        >
          Authors
        </button>
        <button
          type="button"
          onClick={() => setMode("subject")}
          className={clsx(
            styles.InputBtn,
            mode === "subject" ? styles.isActive : "",
          )}
        >
          Subject
        </button>
      </div>
    </div>
  );
};
