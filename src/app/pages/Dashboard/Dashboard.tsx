import { Header } from '../../components/Header/Header';
import { ProviderCard } from '../../components/ProviderCard/ProviderCard';
import { providers } from '../../../providers';
import styles from './Dashboard.module.scss';

export function Dashboard() {
  return (
    <main className={styles.page}>
      <Header />

      <div className={styles.content}>
        <section className={styles.grid}>
          {providers.map((provider) => (
            <ProviderCard provider={provider} key={provider.id} />
          ))}
        </section>
      </div>
    </main>
  );
}
