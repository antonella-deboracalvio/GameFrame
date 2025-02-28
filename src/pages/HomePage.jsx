import { useEffect, useState } from "react";
import { useAsyncList } from "@react-stately/data";
import { useInView } from "react-intersection-observer";
import ListCard from "../components/gameUI/ListCard";
import Sidebar from "../components/Sidebar";
import { Col, Row } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import spinner from '../css/spinner.module.css';
import home from '../css/home.module.css';


function HomePage() {

  const [error , setError] = useState(null)

  const games = useAsyncList({
    async load({ signal, cursor }) {

      try {
        let res = await fetch(
          cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY
          }&dates=2023-01-01,2024-01-01&page=1`,
          { signal }
        );
        let json = await res.json();
        // console.log(" API:", json);
     
        return {
          items: json.results,
          cursor: json.next,
        };
      } catch (err) {
        setError(err);
        throw err;
      }
    },
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
   if (games.items.length && inView && !games.isLoading) {
    // console.log("Loading ", inView);
    games.loadMore();
  }
  }, [inView, games]);

  return (
    <div className="containerHomepage">
      <div className={home["mobileHeader"]}>
      <h1 style={{ display: "flex", justifyContent: "center", height: "50px", marginTop: "40px" }}>New and trending</h1>
      <h6 style={{ display: "flex", justifyContent: "center", height: "50px", marginBottom: "40px" }}>The best games, right now</h6>
      </div>
     
        <div className={home["header-panel"]}>
      <h1 className={home["header-title"]}>Discover Amazing Games</h1>
      <p className={home["header-subtitle"]}>
        Explore genres, platforms, and top-rated games all in one place.
      </p>
    </div>
    
      <Row>
        <Col xs={2} className="sidebar text-white py-4">
          <Sidebar />
        </Col>
        <Col className="col-10" >
          <div>
            <ListCard games={games.items} />
          </div>
          <div ref={ref} className={spinner["loading-container"]}>
            <Spinner animation="border" variant="secondary" className={spinner["loading-spinner"]} />
            {error && <p className="text-danger">Errore: {error.message}</p>}
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;

