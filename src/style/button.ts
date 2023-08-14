import {textVariants} from './text';

export const buttonVariants = {
  defaults: {
    backgroundColor: '$primary',
    borderRadius: 'sm',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingHorizontal: 'xs',
    paddingVertical: 's',
    minHeight: 50,
  },
  // -- PRIMARY --
  primary: {},
  'primary-disabled': {
    opacity: 0.5,
  },
  'primary-left': {},
  'primary-left-disabled': {
    opacity: 0.5,
  },
  'primary-right': {
    flexDirection: 'row-reverse',
  },
  'primary-right-disabled': {
    flexDirection: 'row-reverse',
    opacity: 0.5,
  },
  // -- OUTLINE --
  outline: {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$primary',
  },
  'outline-disabled': {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$primary',
    opacity: 0.5,
  },
  'outline-left': {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$primary',
  },
  'outline-left-disabled': {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$primary',
    opacity: 0.5,
  },
  'outline-right': {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$primary',
    flexDirection: 'row-reverse',
  },
  'outline-right-disabled': {
    backgroundColor: '$transparent',
    borderWidth: 1,
    borderColor: '$primary',
    flexDirection: 'row-reverse',
    opacity: 0.5,
  },
  // -- GHOST --
  ghost: {
    backgroundColor: '$transparent',
  },
  'ghost-disabled': {
    backgroundColor: '$transparent',
    opacity: 0.5,
  },
  'ghost-left': {
    backgroundColor: '$transparent',
  },
  'ghost-left-disabled': {
    backgroundColor: '$transparent',
    opacity: 0.5,
  },
  'ghost-right': {
    backgroundColor: '$transparent',
    flexDirection: 'row-reverse',
  },
  'ghost-right-disabled': {
    backgroundColor: '$transparent',
    flexDirection: 'row-reverse',
    opacity: 0.5,
  },
};

export const buttonTextVariants = {
  defaults: {
    ...textVariants.defaults,
    ...textVariants['link-medium'],
    color: '$bg',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  // -- PRIMARY --
  primary: {},
  'primary-disabled': {
    opacity: 0.5,
  },
  'primary-left': {
    ...textVariants['link-small'],
  },
  'primary-left-disabled': {
    ...textVariants['link-small'],
    opacity: 0.5,
  },
  'primary-right': {
    ...textVariants['link-small'],
    flexDirection: 'row-reverse',
  },
  'primary-right-disabled': {
    ...textVariants['link-small'],
    flexDirection: 'row-reverse',
    opacity: 0.5,
  },
  // -- OUTLINE --
  outline: {
    color: '$primary',
  },
  'outline-disabled': {
    color: '$primary',
    opacity: 0.5,
  },
  'outline-left': {
    color: '$primary',
    ...textVariants['link-small'],
  },
  'outline-left-disabled': {
    color: '$primary',
    ...textVariants['link-small'],
    opacity: 0.5,
  },
  'outline-right': {
    color: '$primary',
    ...textVariants['link-small'],
    flexDirection: 'row-reverse',
  },
  'outline-right-disabled': {
    color: '$primary',
    ...textVariants['link-small'],
    flexDirection: 'row-reverse',
    opacity: 0.5,
  },
  // -- GHOST --
  ghost: {
    color: '$primary',
  },
  'ghost-disabled': {
    color: '$primary',
    opacity: 0.5,
  },
  'ghost-left': {
    color: '$primary',
    ...textVariants['link-small'],
  },
  'ghost-left-disabled': {
    color: '$primary',
    ...textVariants['link-small'],
    opacity: 0.5,
  },
  'ghost-right': {
    color: '$primary',
    ...textVariants['link-small'],
    flexDirection: 'row-reverse',
  },
  'ghost-right-disabled': {
    color: '$primary',
    ...textVariants['link-small'],
    flexDirection: 'row-reverse',
    opacity: 0.5,
  },
};

export const buttonIconVariants = {
  defaults: {
    color: '$bg',
    fontSize: 20,
  },
  // -- PRIMARY --
  primary: {},
  'primary-disabled': {
    opacity: 0.5,
  },
  'primary-left': {
    marginRight: 'm',
  },
  'primary-left-disabled': {
    marginRight: 'm',
    opacity: 0.5,
  },
  'primary-right': {
    marginLeft: 'm',
  },
  'primary-right-disabled': {
    marginLeft: 'm',
    opacity: 0.5,
  },
  // -- OUTLINE --
  outline: {
    color: '$primary',
  },
  'outline-disabled': {
    color: '$primary',
    opacity: 0.5,
  },
  'outline-left': {
    color: '$primary',
    marginRight: 'm',
  },
  'outline-left-disabled': {
    color: '$primary',
    marginRight: 'm',
    opacity: 0.5,
  },
  'outline-right': {
    color: '$primary',
    marginLeft: 'm',
  },
  'outline-right-disabled': {
    color: '$primary',
    marginLeft: 'm',
    opacity: 0.5,
  },
  // -- GHOST --
  ghost: {
    color: '$primary',
  },
  'ghost-disabled': {
    color: '$primary',
    opacity: 0.5,
  },
  'ghost-left': {
    color: '$primary',

    marginRight: 'm',
  },
  'ghost-left-disabled': {
    color: '$primary',
    marginRight: 'm',
    opacity: 0.5,
  },
  'ghost-right': {
    color: '$primary',
    marginLeft: 'm',
  },
  'ghost-right-disabled': {
    color: '$primary',
    marginLeft: 'm',
    opacity: 0.5,
  },
};
