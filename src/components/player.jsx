export default function Player(props) {
  return (
    <article className="playerProfile">
      <div className="img-Container" style="position: relative; height: 500px;">
        <img className="main_image" src={props.img.src} alt={props.img.alt} />
      </div>
    </article>
  );
}
