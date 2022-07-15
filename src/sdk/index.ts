/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
import contentstack from 'contentstack';
import * as Utils from '@contentstack/utils';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

type GetEntry = {
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

type GetEntryByUrl = {
  entryUrl: string | undefined;
  contentTypeUid: string;
  referenceFieldPath: string[] | undefined;
  jsonRtePath: string[] | undefined;
};

const Stack = contentstack.Stack({
  api_key: import.meta.env.VITE_CONTENTSTACK_API_KEY,
  delivery_token: import.meta.env.VITE_CONTENTSTACK_DELIVERY_TOKEN,
  environment: import.meta.env.VITE_CONTENTSTACK_ENVIRONMENT,
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
  //@ts-ignore
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
  span: (node: any, next: any) => next(node.children)
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
  getEntry({ contentTypeUid, referenceFieldPath, jsonRtePath }: GetEntry) {
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
  getEntryByUrl({ contentTypeUid, entryUrl, referenceFieldPath, jsonRtePath }: GetEntryByUrl) {
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
