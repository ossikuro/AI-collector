import { createRoot } from 'react-dom/client';
import { Button } from '../../../src/app/components/UI/Button/Button';

const icon = (
  <svg viewBox="0 0 24 24" focusable="false">
    <path d="M12 5a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 12 5Z" />
  </svg>
);

export function ButtonFixture() {
  const handleEnabledClick = () => {
    document.body.dataset.enabledClicks = String(
      Number(document.body.dataset.enabledClicks ?? 0) + 1,
    );
  };

  const handleDisabledClick = () => {
    document.body.dataset.disabledClicks = String(
      Number(document.body.dataset.disabledClicks ?? 0) + 1,
    );
  };

  return (
    <>
      <Button aria-label="Icon action" icon={icon} tooltip="Icon action" />
      <Button onClick={handleEnabledClick}>Clickable action</Button>
      <Button disabled onClick={handleDisabledClick}>
        Disabled action
      </Button>
    </>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Button test root was not found.');
}

createRoot(rootElement).render(<ButtonFixture />);
