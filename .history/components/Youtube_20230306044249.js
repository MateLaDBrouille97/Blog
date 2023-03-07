import styles from "@/styles/youtube.css";

export default function YouTube({ id }) {
  return (
    <div className={styles.container}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className={styles.frame}
      />
    </div>
  );
}