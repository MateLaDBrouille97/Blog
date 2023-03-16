

export default function Video({ video }) {
  return (
    <div className="container__youtube">
      <video
        src={video}
        loop
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className="frame"
      />
    </div>
  );
}