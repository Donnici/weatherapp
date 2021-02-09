import 'react-native-gesture-handler';
import React, { FC } from 'react';
import Toast from 'react-native-toast-message';

import Routes from './main/Routes';

const App: FC = () => {
	return (
		<>
			<Routes />
			<Toast ref={(ref) => Toast.setRef(ref)} />
		</>
	);
};

export default App;
