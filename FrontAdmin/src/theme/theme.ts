import { extendTheme } from '@chakra-ui/react';
import { globalStyles } from './styles';
import { buttonStyles } from './components/button';


export default extendTheme(
	globalStyles,
	buttonStyles, 
);
