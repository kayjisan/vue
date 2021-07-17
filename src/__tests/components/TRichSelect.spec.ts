import { shallowMount } from '@vue/test-utils';
import { TRichSelectConfig } from '@variantjs/core';
import TRichSelect from '../../components/TRichSelect.vue';
import { getChildComponentNameByRef } from '../testUtils';

describe('TRichSelect.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(TRichSelect);
    expect(wrapper.get('div')).toBeTruthy();
  });

  it('has a trigger', () => {
    const wrapper = shallowMount(TRichSelect);

    expect(getChildComponentNameByRef(wrapper, 'trigger')).toBe('RichSelectTrigger');
  });

  it('has a dropdown', () => {
    const wrapper = shallowMount(TRichSelect);

    expect(wrapper.vm.$refs.dropdown).toBeTruthy();
    expect(wrapper.vm.$refs.dropdown.tagName).toBe('DIV');
  });
});
