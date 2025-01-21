
import { ProgressBar } from "react-bootstrap";
import detail from '../css/detail.module.css';

export default function Ratings() {

    // console.log(ratings);

    return (


        <div className={detail.ratings}>
            <div className={detail.ratingsHeader}>
          
            </div>
            <div className={detail.ratingBar}>
                <ProgressBar>
                    <ProgressBar
                        variant="danger"
                        now={72.94}
                        key={1}
                    />
                    <ProgressBar
                        variant="warning"
                        now={15.21}
                        key={2}
                    />
                    <ProgressBar
                        variant="success"
                        now={6.7}
                        key={3}
                    />
                    <ProgressBar
                        variant="secondary"
                        now={5.15}
                        key={4}
                    />
                </ProgressBar>
            </div>
        </div>
    )
}


