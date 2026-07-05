import logoUrl from '../../../assets/SV{}ISOROKI.svg';
import { Button } from '../UI/Button/Button';
import styles from './Header.module.scss';

const addIcon = (
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M12 5a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 12 5Z" />
  </svg>
);

const statsIcon = (
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M5.75 19A.75.75 0 0 1 5 18.25V5.75a.75.75 0 0 1 1.5 0V17.5h11.75a.75.75 0 0 1 0 1.5H5.75Z" />
    <path d="M8.22 14.78a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0l1.47 1.47 3.47-3.47a.75.75 0 1 1 1.06 1.06l-4 4a.75.75 0 0 1-1.06 0l-1.47-1.47-2.47 2.47a.75.75 0 0 1-1.06 0Z" />
  </svg>
);

const settingsIcon = (
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M12 15.25A3.25 3.25 0 1 1 12 8.75a3.25 3.25 0 0 1 0 6.5Zm0-1.5a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" />
    <path d="M10.28 21a.75.75 0 0 1-.72-.53l-.45-1.45a7.7 7.7 0 0 1-1.23-.71l-1.48.34a.75.75 0 0 1-.7-.2l-1.17-1.17a.75.75 0 0 1-.2-.7l.34-1.48a7.7 7.7 0 0 1-.71-1.23l-1.45-.45A.75.75 0 0 1 2 12.7v-1.4a.75.75 0 0 1 .53-.72l1.45-.45c.18-.43.42-.84.71-1.23l-.34-1.48a.75.75 0 0 1 .2-.7L5.7 5.55a.75.75 0 0 1 .7-.2l1.48.34c.39-.29.8-.53 1.23-.71l.45-1.45a.75.75 0 0 1 .72-.53h1.44a.75.75 0 0 1 .72.53l.45 1.45c.43.18.84.42 1.23.71l1.48-.34a.75.75 0 0 1 .7.2l1.17 1.17a.75.75 0 0 1 .2.7l-.34 1.48c.29.39.53.8.71 1.23l1.45.45a.75.75 0 0 1 .53.72v1.4a.75.75 0 0 1-.53.72l-1.45.45a7.7 7.7 0 0 1-.71 1.23l.34 1.48a.75.75 0 0 1-.2.7l-1.17 1.17a.75.75 0 0 1-.7.2l-1.48-.34c-.39.29-.8.53-1.23.71l-.45 1.45a.75.75 0 0 1-.72.53h-1.44Zm.55-1.5h.34l.41-1.3a.75.75 0 0 1 .5-.49 6.12 6.12 0 0 0 1.55-.9.75.75 0 0 1 .68-.14l1.33.3.24-.24-.3-1.33a.75.75 0 0 1 .14-.68c.38-.48.68-1 .9-1.55a.75.75 0 0 1 .49-.5l1.3-.41v-.34l-1.3-.41a.75.75 0 0 1-.49-.5 6.12 6.12 0 0 0-.9-1.55.75.75 0 0 1-.14-.68l.3-1.33-.24-.24-1.33.3a.75.75 0 0 1-.68-.14 6.12 6.12 0 0 0-1.55-.9.75.75 0 0 1-.5-.49l-.41-1.3h-.34l-.41 1.3a.75.75 0 0 1-.5.49 6.12 6.12 0 0 0-1.55.9.75.75 0 0 1-.68.14l-1.33-.3-.24.24.3 1.33a.75.75 0 0 1-.14.68c-.38.48-.68 1-.9 1.55a.75.75 0 0 1-.49.5l-1.3.41v.34l1.3.41a.75.75 0 0 1 .49.5c.22.55.52 1.07.9 1.55a.75.75 0 0 1 .14.68l-.3 1.33.24.24 1.33-.3a.75.75 0 0 1 .68.14c.48.38 1 .68 1.55.9a.75.75 0 0 1 .5.49l.41 1.3Z" />
  </svg>
);

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.brand} aria-label="svoi.soroki">
        <img className={styles.logo} src={logoUrl} alt="" aria-hidden="true" />
      </div>

      <div className={styles.searchPlaceholder} aria-label="Будущий поиск">
        <svg className={styles.searchIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M10.75 17.5a6.75 6.75 0 1 1 4.77-11.52 6.75 6.75 0 0 1-4.77 11.52Zm0-1.5a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5Z" />
          <path d="M15.5 15.5a.75.75 0 0 1 1.06 0l3.22 3.22a.75.75 0 1 1-1.06 1.06l-3.22-3.22a.75.75 0 0 1 0-1.06Z" />
        </svg>
        <span>Поиск</span>
      </div>

      <div className={styles.actions}>
        <Button aria-label="Добавить" icon={addIcon} tooltip="Добавить" />
        <Button aria-label="Статистика" icon={statsIcon} tooltip="Статистика" />
        <Button aria-label="Настройки" icon={settingsIcon} tooltip="Настройки" />
        <Button buttonStyle="CTA" aria-label="Open All" className={styles.openAllButton}>
          Open All
        </Button>
      </div>
    </header>
  );
}
