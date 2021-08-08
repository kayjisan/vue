import { VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';
import { Data } from '../types';

export const scopedParamsAsString = (params: Data) : string => {
  const keys = Object.keys(params);
  const result: Data = {};
  keys.filter((key) => key !== 'key').forEach((key) => {
    result[key] = typeof params[key];
  });
  return JSON.stringify(result);
};

export const parseScopedParams = (paramsAsString: string) : Data => JSON.parse(paramsAsString);

export const getChildComponentNameByRef = (wrapper: VueWrapper<ComponentPublicInstance>, refName: string): string | undefined => {
  const component = wrapper.vm.$refs[refName] as ComponentPublicInstance | undefined;

  return component?.$?.type.name;
};