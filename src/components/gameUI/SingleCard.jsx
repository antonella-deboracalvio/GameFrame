import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Card } from "react-bootstrap";
import { Link } from 'react-router';
import card from '../../css/card.module.css';

function SingleCard({ game, id }) {
  return (
    <div className='me-2'>
      <Link to={`/game/${id}`} className="text-decoration-none">
        <Card style={{ width: '18rem' }} className={card.cardCustom}>
          <LazyLoadImage
            alt={game.name}
            src={game.background_image}
            effect='opacity'
            className={card.cardImage}
          />
          <Card.Body>
            <Card.Title>{game.name}</Card.Title>
          </Card.Body>
        </Card>
      </Link >
      <div className="mt-2">
        {game.genres.map((genre) => (
          <Link
            to={`/games/${genre.slug}`}

            key={genre.id}
            className="text-decoration-none me-2"
            style={{ color: "white" }}
            onClick={(e) => e.stopPropagation()}
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SingleCard;