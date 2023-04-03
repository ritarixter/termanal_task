import { FC, useState } from "react";
import styles from "./modal.module.scss";
import { IModal } from "../../utils/types";
import close from "../../images/close.svg";

const Modal: FC<IModal> = (props) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (evt: { target: { value: string } }) => {
    if (evt.target.value.match(/[^0-9]/g)) {
      evt.target.value = evt.target.value.replace(/[^0-9]/g, "");
    }
    setInputValue(evt.target.value);
  };

  const handleClick = () => {
    props.setArchive([
      ...props.archive,
      {
        side: props.type,
        price: props.valueCurrency,
        instrument: props.nameCurrency,
        volume: inputValue,
        timestamp: props.date,
      },
    ]);
    setInputValue("");
    props.setOpen(false);
  };

  return (
    <div className={`${styles.modal} ${props.open && styles.modal_open}`}>
      <img
        src={close}
        alt="Иконка крестика"
        className={styles.icon}
        onClick={() => props.setOpen(false)}
      />
      <div className={styles.currency}>
        <p>
          {" "}
          <span className={styles.currency__type}>
            {props.type === "sell" ? "SELL" : "BUY"}
          </span>{" "}
          {props.valueCurrency}
        </p>
        {props.nameCurrency}
      </div>

      <label className={styles.label}>
        Volume{" "}
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          placeholder="100"
          onChange={(evt) => handleChange(evt)}
        />
      </label>
      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => props.setOpen(false)}>
          Cancel
        </button>
        <button
          className={styles.button}
          disabled={!inputValue}
          onClick={() => {
            handleClick();
          }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default Modal;
