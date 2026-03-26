import { BRANDS } from "../../lib/consts.ts";
import { Button } from "../button/button.tsx";
import { Modal, type ModalProps } from "../modal/modal.tsx";
import styles from "./add-insight.module.css";

type AddInsightProps = ModalProps;

export const AddInsight = (props: AddInsightProps) => {

  // onSubmit handler must prevent page reload
  const addInsight = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevents full page reload

    const form = e.currentTarget;

    // read values using "name" attributes
    const brand = Number(
      (form.elements.namedItem("brand") as HTMLSelectElement).value
    );
    const text = (form.elements.namedItem("text") as HTMLTextAreaElement).value;

    // FIX #3 — send POST request to backend
    await fetch("/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brand, text }),
    });

    // refresh parent list + close modal
    props.refresh?.();
    props.onClose?.();
  };

  return (
    <Modal {...props}>
      <h1 className={styles.heading}>Add a new insight</h1>

      {/* onSubmit now calls our handler */}
      <form className={styles.form} onSubmit={addInsight}>

        {/* added name="brand" so we can read it */}
        <label className={styles.field}>
          <select name="brand" className={styles["field-input"]}>
            {BRANDS.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
        </label>

        {/* added name="text" so we can read it */}
        <label className={styles.field}>
          Insight
          <textarea
            name="text"
            className={styles["field-input"]}
            rows={5}
            placeholder="Something insightful..."
          />
        </label>

        <Button className={styles.submit} type="submit" label="Add insight" />
      </form>
    </Modal>
  );
};