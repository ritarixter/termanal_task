import { FC, useState } from "react";
import styles from "./dropdownlist.module.scss";
import arrow from "../../images/arrow.svg";
import { IDropdownList } from "../../utils/types";

// Стилизованный выпадающий список, доделать скролл (как в макете)
export const DropdownList: FC<IDropdownList> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const handlerClick = (index: number) => {
    props.setState(props.data[index]);
  };

  return (
    <div className={styles.dropdownList}>
      <div
        className={`${styles.select} ${open && styles.select_open}`}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span className={styles.title}>{props.state}</span>
        <img
          src={arrow}
          className={`${styles.arrow} ${open && styles.arrow_open} `}
          alt="Стрелка выпадающего списка"
        />
        {open && (
          <ul className={styles.menu}>
            {props.data.map((item, index) => (
              <li
                className={styles.option}
                key={index}
                onClick={() => handlerClick(index)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
