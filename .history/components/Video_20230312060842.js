

export default function Video({ video }) {
  return (
    <div className="container__youtube">
      <iframe
        src={video }
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className="frame"
      />
    </div>
  );
}