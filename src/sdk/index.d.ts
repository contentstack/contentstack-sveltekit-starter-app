/* eslint-disable no-undef */
import * as contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

const Stack = contentstack.Stack({
  api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
  delivery_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN,
  environment: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
  region: import.meta.env.VITE_CONTENTSTACK_REGION
    ? import.meta.env.VITE_CONTENTSTACK_REGION
    : 'us',
  live_preview: {
    management_token: import.meta.env.VITE_CONTENTSTACK_MANAGEMENT_TOKEN
      ? import.meta.env.VITE_CONTENTSTACK_MANAGEMENT_TOKEN
      : '',
    enable: true,
    host: import.meta.env.VITE_CONTENTSTACK_API_HOST
      ? import.meta.env.VITE_CONTENTSTACK_API_HOST
      : ''
  }
});

if (import.meta.env.VITE_CONTENTSTACK_API_HOST) {
  Stack.setHost(import.meta.env.VITE_CONTENTSTACK_API_HOST);
}

ContentstackLivePreview.init({
  stackSdk: Stack,
  clientUrlParams: {
    host: import.meta.env.VITE_CONTENTSTACK_APP_HOST
  },
  stackDetails: {
    apiKey: import.meta.env.VITE_API_KEY,
    environment: import.meta.env.VITE_ENVIRONMENT
  },
  ssr: false
});

export const { onEntryChange } = ContentstackLivePreview;

const renderOption = {
  span: (node, next) => next(node.children)
};

export default {
  /**
   *
   * fetches all the entries from specific content-type
   * @param {* content-type uid} contentTypeUid
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   *
   */
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const query = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) query.includeReference(referenceFieldPath);
      query
        .includeOwner()
        .toJSON()
        .find()
        .then(
          (result) => {
            jsonRtePath &&
              Utils.jsonToHTML({
                entry: result,
                paths: jsonRtePath,
                renderOption
              });
            resolve(result);
          },
          (error) => {
            reject(error);
          }
        );
    });
  },

  /**
   *fetches specific entry from a content-type
   *
   * @param {* content-type uid} contentTypeUid
   * @param {* url for entry to be fetched} entryUrl
   * @param {* reference field name} referenceFieldPath
   * @param {* Json RTE path} jsonRtePath
   * @returns
   */
  getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath }) {
    return new Promise((resolve, reject) => {
      const blogQuery = Stack.ContentType(contentTypeUid).Query();
      if (referenceFieldPath) blogQuery.includeReference(referenceFieldPath);
      blogQuery.includeOwner().toJSON();
      const data = blogQuery.where('url', `${entryUrl}`).find();
      data.then(
        (result) => {
          jsonRtePath &&
            Utils.jsonToHTML({
              entry: result,
              paths: jsonRtePath,
              renderOption
            });
          resolve(result[0]);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
};
