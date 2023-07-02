import { Link } from 'react-router-dom';
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.content}>
        <h1 className={styles.title}>Foods Project</h1>
        <h3 className={styles.title2}>By: Parma Javier</h3>
        <Link to="/home">
          <button className={styles.button}>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Landing;