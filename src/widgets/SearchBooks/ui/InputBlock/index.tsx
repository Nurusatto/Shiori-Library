import { InputProp } from "../../model/type";
import styles from "./style.module.scss";

export const InputBlock = ({
  state,
  setState,
  placeholder,
  setPlaceholder,
}: InputProp) => {
  return (
    <div className={styles.InputBlock}>
      <div className={styles.InputAction}>
        <button
          className={styles.InputBtn}
          onClick={() => setPlaceholder("books")}
        >
          Books
        </button>
        <button
          className={styles.InputBtn}
          onClick={() => setPlaceholder("author")}
        >
          Authors
        </button>
      </div>
      <h3 className={styles.InputMessage}>
        Please enter at least 3 letters to search
      </h3>
      <input
        placeholder={placeholder}
        className={styles.Input}
        autoComplete="off"
        value={state}
        onChange={(e) => setState(e.target.value)}
        name="Input"
      />
    </div>
  );
};
