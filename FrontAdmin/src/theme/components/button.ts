import { background } from '@chakra-ui/react';
import { color } from 'chart.js/helpers';
import { ImTextColor } from 'react-icons/im';

export const buttonStyles = {
  components: {
    Button: {
      variants: {
        'no-hover': {
          _hover: {
            boxShadow: 'none',
          },
        },
        'transparent-with-icon': {
          bg: 'transparent',
          fontWeight: 'bold',
          borderRadius: 'inherit',
          cursor: 'pointer',
          _active: {
            bg: 'transparent',
            transform: 'none',
            borderColor: 'transparent',
          },
          _focus: {
            boxShadow: 'none',
          },
          _hover: {
            boxShadow: 'none',
          },
        },
        light: {
          background: 'transparent',
          fontWeight: '500',
          color: '#022855',
          border: '1px solid #022855',
          _hover: {
            bg: '#º  ',
            background: '#e9eef4',
          },
          borderRadius: '15px',
          _focus: {
            boxShadow: 'none',
          },
        },
      },
      baseStyle: {
        bg: '#022855',
        background: '#022855',
        fontWeight: '500',
        color: 'white',
        _hover: {
          bg: '#0f183f',
          background: '#0f183f',
        },
        //
        borderRadius: '15px',
        _focus: {
          boxShadow: 'none',
        },
      },
    },
  },
};
