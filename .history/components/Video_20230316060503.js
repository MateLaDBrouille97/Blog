

export default function Video({ video }) {
  return (
    <div className="container__youtube">
      <video
      
        loop
        allow="autoplay; encrypted-media"
        title="Embedded YouTube video"
        className="frame"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}