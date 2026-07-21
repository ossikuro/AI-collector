import { createRoot } from 'react-dom/client';
import { ProviderCard } from '../../../src/app/components/ProviderCard/ProviderCard';
import type { Provider } from '../../../src/core/types';

const provider: Provider = {
  id: 'kling',
  name: 'Kling AI',
  categories: ['video'],
  websiteUrl: 'https://klingai.com',
  launchUrl: 'https://klingai.com',
};

window.aiCollector = {
  async openProviderUrl(url: string) {
    document.body.dataset.openedUrl = url;
  },
};

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('ProviderCard test root was not found.');
}

createRoot(rootElement).render(<ProviderCard provider={provider} />);
