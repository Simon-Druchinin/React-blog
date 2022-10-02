export const Card = ({ title, imageUrl, body }) => {
  {/*
  *PARAMS:
  infinite - infinite scroll
  
  *COMMENTS:
  demands 1920x1080 images
  */}
  return (
    <div className="card-container">
      <div className="card-image-container">
        <img src={ imageUrl } alt="" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{ title }</h3>
        </div>
        <div className="card-body">
          <p>{ body }</p>
        </div>
      </div>
      <div className="card-button">
        <button className="info-button__solid"><a href="#">Узнать больше</a></button>
      </div>
    </div>
)}