export default function Player(props) {
  return (
    <article className="playerProfile">
      <div className="img-Container">
        <button
          className="image-button"
          onClick={() => props.onButtonClick(props.id)}
        >
          <div className="image-text">
            <span className="name-text">{props.title}</span>
            {props.showPoints && (
              <span className="points-text"> {props.points} points</span>
            )}
          </div>

          <img className="main_image" src={props.imgSrc} alt={props.imgAlt} />
        </button>
      </div>
    </article>
  );
}
