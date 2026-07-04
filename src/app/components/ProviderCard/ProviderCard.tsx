import type { Provider } from '../../../core/types';
import styles from './ProviderCard.module.scss';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div>
          <h2 className={styles.title}>{provider.name}</h2>
          <div className={styles.categories}>
            {provider.categories.map((category) => (
              <span className={styles.category} key={category}>
                {category}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.status}>Not connected</div>
      </div>
      <button className={styles.button} type="button">
        Open
      </button>
    </article>
  );
}
