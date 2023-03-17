

export default function Video({ video }) {
  return (
    <div className="container__youtube">
      <video 
       controls
       autoplay
       className="frame"
      >
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
}