

export default function Video({ video }) {
  return (
    <div className="container__youtube">
      <video
      
       controls
       autoPlay
        title="Embedded YouTube video"
        className="frame"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}