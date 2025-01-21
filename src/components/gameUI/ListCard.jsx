
import SingleCard from "../gameUI/SingleCard";
import { Container, Row, Col } from "react-bootstrap";
import card from '../../css/card.module.css'



function ListCard({ games }) {
  if (!Array.isArray(games) || games.length === 0) {
    return <p>Nessun gioco da mostrare.</p>;
  }

  return (
    <Container className={card.backgroundDark}>
      <Row className="g-3">
        {games.map((game) => (
          <Col key={game.id}>
            <SingleCard game={game} id={game.id} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default ListCard;
