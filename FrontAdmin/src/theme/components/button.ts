import { background } from "@chakra-ui/react";
import { color } from "chart.js/helpers";
import { ImTextColor } from "react-icons/im";

export const buttonStyles = {
  components: {
    Button: {
      /*variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
          _hover: {
            boxShadow: "none",
          },
        },
      },*/
      baseStyle: {
        //add
        bg: '#022855',
        background:  "#022855",
        fontWeight: '500',
        color: 'white',
        letterSpacing:'1px',
        _hover:{
          bg:  "#0f183f",
          background:  "#0f183f",
        },
        //
        borderRadius: "15px",
        _focus: {
          boxShadow: "none",
        },
      },
    },
  },
};
