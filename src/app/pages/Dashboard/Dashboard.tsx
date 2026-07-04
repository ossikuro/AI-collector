import { ProviderCard } from '../../components/ProviderCard/ProviderCard';
import { providers } from '../../../providers';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <h1 className={styles.title}>AI Collector</h1>
        <p className={styles.description}>
          Manage AI services, accounts, sessions and daily credit checks.
        </p>
      </section>

      <section className={styles.grid}>
        {providers.map((provider) => (
          <ProviderCard provider={provider} key={provider.id} />
        ))}
      </section>
    </main>
  );
}