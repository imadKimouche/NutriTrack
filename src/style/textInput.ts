import {textVariants} from './text';

export const tiContainerVariants = {
  defaults: {
    backgroundColor: '$input',
    paddingVertical: 's',
    paddingHorizontal: 'm',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 'sm',
  },
  selected: {
    borderWidth: 1,
    borderColor: '$header',
  },
  disabled: {
    opacity: 0.5,
  },
  caption: {},
  error: {
    backgroundColor: '$dangerBg',
    borderWidth: 1,
    borderColor: '$danger',
  },
  success: {
    backgroundColor: '$successBg',
    borderWidth: 1,
    borderColor: '$success',
  },
};

export const tiIconVariants = {
  defaults: {
    fontSize: 20,
    color: '$label',
    marginRight: 's',
  },
  selected: {},
  disabled: {},
  caption: {},
  error: {
    color: '$danger',
  },
  success: {
    color: '$success',
  },
};

export const tiInputVariants = {
  defaults: {
    ...textVariants.defaults,
    ...textVariants['text-small'],
    lineHeight: 20,
    color: '$header',
    backgroundColor: '$transparent',
    flex: 1,
    marginVertical: 'xs',
    textTransform: 'capitalize',
  },
  selected: {},
  disabled: {},
  caption: {},
  error: {},
  success: {},
};

export const tiHintVariants = {
  defaults: {
    ...textVariants['text-x-small'],
    color: '$header',
  },
  selected: {},
  disabled: {},
  caption: {},
  error: {
    color: '$danger',
  },
  success: {
    color: '$success',
  },
};
