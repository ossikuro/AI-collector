import type { Provider } from '../../../core/types';
import { Button } from '../UI/Button/Button';
import styles from './ProviderCard.module.scss';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const openProvider = () => {
    void window.providerApi.open(provider.id, provider.launchUrl);
  };

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
      <Button buttonStyle="CTA" className={styles.button} onClick={openProvider} size="L">
        Open
      </Button>
    </article>
  );
}
