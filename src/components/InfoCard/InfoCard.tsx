import styles from './InfoCard.module.css';

interface Props {
  title: string;
  amount: number;
  image: string;
  color: string;
}

const InfoCard = ({ title, amount, image, color }: Props) => {
  return (
    <div className={styles['info-card']}>
      <div className={styles.image} style={{ backgroundColor: `${color}` }}>
        <img src={image} alt='Icon' />
      </div>
      <div className={styles.content}>
        <h4>{title}</h4>
        <p>$ {amount}</p>
      </div>
    </div>
  );
};

export default InfoCard;
