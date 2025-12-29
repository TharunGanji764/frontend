import { Components } from '@mui/material/styles';

export const components: Components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 999, // Pill shape
        textTransform: 'none',
        fontWeight: 600,
        padding: '8px 20px',
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 14,
        boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },
};
