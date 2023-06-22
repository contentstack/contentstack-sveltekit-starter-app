import contentstack from "contentstack"
const {
  VITE_CONTENTSTACK_API_KEY,
  VITE_CONTENTSTACK_DELIVERY_TOKEN,
  VITE_CONTENTSTACK_ENVIRONMENT,
  VITE_CONTENTSTACK_BRANCH,
  VITE_CONTENTSTACK_REGION,
  VITE_CONTENTSTACK_MANAGEMENT_TOKEN,
  VITE_CONTENTSTACK_API_HOST,
  VITE_CONTENTSTACK_APP_HOST,
  VITE_CONTENTSTACK_LIVE_PREVIEW
} = import.meta.env;

// basic env validation
export const isBasicConfigValid = () => {
  return (
    !!VITE_CONTENTSTACK_API_KEY &&
    !!VITE_CONTENTSTACK_DELIVERY_TOKEN &&
    !!VITE_CONTENTSTACK_ENVIRONMENT
  );
};
// Live preview config validation
export const isLpConfigValid = () => {
  return (
    !!VITE_CONTENTSTACK_LIVE_PREVIEW &&
    !!VITE_CONTENTSTACK_MANAGEMENT_TOKEN &&
    !!VITE_CONTENTSTACK_API_HOST &&
    !!VITE_CONTENTSTACK_APP_HOST
  );
};
// set region
const setRegion = (): contentstack.Region => {
  let region = 'US' as keyof typeof contentstack.Region;
  if (!!VITE_CONTENTSTACK_REGION && VITE_CONTENTSTACK_REGION !== 'us') {
    region = VITE_CONTENTSTACK_REGION.toLocaleUpperCase().replace('-', '_') as keyof typeof contentstack.Region;
  }
  return contentstack.Region[region];
};
// set LivePreview config
const setLivePreviewConfig = (): contentstack.LivePreview => {
  if (!isLpConfigValid())
    throw new Error(
      'Your LP config is set to true. Please make you have set all required LP config in .env'
    );
  return {
    management_token: VITE_CONTENTSTACK_MANAGEMENT_TOKEN as string,
    enable: VITE_CONTENTSTACK_LIVE_PREVIEW === 'true',
    host: VITE_CONTENTSTACK_API_HOST as string
  } as contentstack.LivePreview;
};
// contentstack sdk initialization
export const initializeContentStackSdk = (): contentstack.Stack => {
  if (!isBasicConfigValid()) throw new Error('Please set you .env file before running starter app');
  const stackConfig: contentstack.Config = {
    api_key: VITE_CONTENTSTACK_API_KEY as string,
    delivery_token: VITE_CONTENTSTACK_DELIVERY_TOKEN as string,
    environment: VITE_CONTENTSTACK_ENVIRONMENT as string,
    region: setRegion(),
    branch: VITE_CONTENTSTACK_BRANCH || 'main'
  };
  if (VITE_CONTENTSTACK_LIVE_PREVIEW === 'true') {
    stackConfig.live_preview = setLivePreviewConfig();
  }
  return contentstack.Stack(stackConfig);
};
// api host url
export const customHostUrl = (baseUrl: string): string => {
  return baseUrl.replace('api', 'cdn');
};
// generate prod api urls
export const generateUrlBasedOnRegion = (): string[] => {
  return Object.keys(contentstack.Region).map((region) => {
    if (region === 'US') {
      return `cdn.contentstack.io`;
    }
    return `${region}-cdn.contentstack.com`;
  });
};
// prod url validation for custom host
export const isValidCustomHostUrl = (url: string): boolean => {
  return url ? !generateUrlBasedOnRegion().includes(url) : false;
};
