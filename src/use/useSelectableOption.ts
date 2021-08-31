/* eslint-disable no-param-reassign */
import {
  addToArray, Data, isEqual, NormalizedOption, substractFromArray, WithVariantPropsAndClassesList,
} from '@variantjs/core';
import {
  computed, ComputedRef, Ref,
} from 'vue';

export default function useSelectableOption<C extends WithVariantPropsAndClassesList<Data, string>>(
  options: Ref<NormalizedOption[]>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  localValue: Ref<any>,
  configuration: Ref<C>,
): {
    selectedOption: ComputedRef<NormalizedOption | NormalizedOption[] | undefined>,
    hasSelectedOption: ComputedRef<boolean>,
    selectOption: (option: NormalizedOption) => void,
    toggleOption: (option: NormalizedOption) => void,
    optionIsSelected: (option: NormalizedOption) => boolean,
  } {
  const optionIsSelected = (option: NormalizedOption): boolean => {
    if (configuration.value.multiple === true) {
      return Array.isArray(localValue.value)
          && localValue.value.some((value) => isEqual(value, option.value));
    }

    return isEqual(localValue.value, option.value);
  };

  const selectedOption = computed((): NormalizedOption | NormalizedOption[] | undefined => {
    if (configuration.value.multiple === true) {
      if (!Array.isArray(localValue.value)) {
        return [];
      }

      return options.value.filter((option) => optionIsSelected(option));
    }

    return options.value.find((option) => optionIsSelected(option));
  });

  const selectOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      return;
    }

    if (configuration.value.multiple === true) {
      if (Array.isArray(localValue.value)) {
        localValue.value = addToArray(localValue.value, option.value);
      } else {
        localValue.value = [option.value];
      }
    } else {
      localValue.value = option.value;
    }
  };

  const toggleOption = (option: NormalizedOption): void => {
    if (optionIsSelected(option)) {
      if (configuration.value.multiple === true) {
        localValue.value = substractFromArray(localValue.value, option.value);
      } else {
        localValue.value = undefined;
      }
    } else if (configuration.value.multiple === true) {
      if (Array.isArray(localValue.value)) {
        localValue.value = addToArray(localValue.value, option.value);
      } else {
        localValue.value = [option.value];
      }
    } else {
      localValue.value = option.value;
    }
  };

  const hasSelectedOption = computed((): boolean => {
    if (configuration.value.multiple === true) {
      return (selectedOption.value as NormalizedOption[]).length > 0;
    }

    return selectedOption.value !== undefined;
  });

  return {
    selectedOption,
    hasSelectedOption,
    selectOption,
    toggleOption,
    optionIsSelected,
  };
}
