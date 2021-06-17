/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { shallowMount } from '@vue/test-utils';
import TButton from '@/components/TButton.vue';
import { TButtonTheme } from '@variantjs/core';

describe('TButton.vue', () => {
  it('renders the button', () => {
    const wrapper = shallowMount(TButton);
    expect(wrapper.get('button')).toBeTruthy();
  });

  it('renders the button with a default set of classes', () => {
    const wrapper = shallowMount(TButton);

    expect(wrapper.html()).toBe(`<button class="${TButtonTheme.classes}"></button>`);
  });

  it('renders the button without attributes if no default theme', () => {
    const wrapper = shallowMount(TButton, {
      global: {
        provide: {
          configuration: {
            TButton: {
              classes: undefined,
            },
          },
        },
      },
    });

    expect(wrapper.html()).toBe('<button></button>');
  });

  it('renders the button with the text in the slot', () => {
    const wrapper = shallowMount(TButton, {
      props: {
        classes: undefined,
      },
      slots: {
        default: 'Press me!',
      },
    });

    expect(wrapper.html()).toBe('<button>Press me!</button>');
  });

  it('set the props.value as the button value', () => {
    const value = 'button value';
    const wrapper = shallowMount(TButton, {
      props: { value },
    });

    expect(wrapper.vm.$el.value).toBe(value);
  });

  it('disables the button', async () => {
    const wrapper = shallowMount(TButton, {
      props: { disabled: false },
    });
    expect(wrapper.vm.$el.disabled).toBe(false);

    await wrapper.setProps({ disabled: true });

    expect(wrapper.vm.$el.disabled).toBe(true);
  });

  it('accepts misc button attributes', async () => {
    const wrapper = shallowMount(TButton);

    const values = {
      id: {
        default: '',
        new: 'new-id',
      },
      autofocus: {
        default: false,
        new: true,
      },
      disabled: {
        default: false,
        new: true,
      },
      name: {
        default: '',
        new: 'new-name',
      },
      title: {
        default: '',
        new: 'new-title',
      },
      type: {
        default: 'submit',
        new: 'button',
      },
    };

    const newProps: any = {};
    // Check for the default values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.default);

      newProps[key as any] = elementValue.new;
    });

    await wrapper.setProps(newProps);

    // Check for the new values
    Object.keys(values).forEach((key) => {
      const elementValue = (values as any)[key];
      expect(wrapper.vm.$el[elementValue.keyName || key]).toBe(elementValue.new);
    });
  });

  it('emits native button events', () => {
    const onClick = jest.fn();
    const onBlur = jest.fn();
    const onFocus = jest.fn();
    const onKeyup = jest.fn();

    const wrapper = shallowMount(TButton, {
      attrs: {
        onClick,
        onBlur,
        onFocus,
        onKeyup,
      },
    });

    const button = wrapper.vm.$el;

    button.dispatchEvent(new MouseEvent('click'));
    expect(onClick).toHaveBeenCalled();

    button.dispatchEvent(new FocusEvent('focus'));
    expect(onFocus).toHaveBeenCalled();

    button.dispatchEvent(new FocusEvent('blur'));
    expect(onBlur).toHaveBeenCalled();

    button.dispatchEvent(new KeyboardEvent('keyup', { key: 'a' }));
    expect(onKeyup).toHaveBeenCalled();
  });

  it('has native button methods', () => {
    const wrapper = shallowMount(TButton);

    const button = wrapper.vm.$el;

    expect(typeof button.click).toBe('function');
    expect(typeof button.focus).toBe('function');
    expect(typeof button.blur).toBe('function');
  });

  it('triggers custom events', async () => {
    const onCustom = jest.fn();

    const wrapper = shallowMount(TButton, {
      attrs: {
        onCustom,
      },
    });
    const button = wrapper.vm.$el as HTMLButtonElement;

    const evt = new CustomEvent('custom', { detail: 'my-custom-event' });
    button.dispatchEvent(evt);

    expect(onCustom).toHaveBeenCalled();
  });
});