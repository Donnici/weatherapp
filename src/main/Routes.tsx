import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Theme } from '@theme';

import { Home } from '../screens';

const Stack = createStackNavigator();

const Routes: FC = () => {
	return (
		<NavigationContainer>
			<Theme>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
				>
					<Stack.Screen name='Home' component={Home} />
				</Stack.Navigator>
			</Theme>
		</NavigationContainer>
	);
};

export default Routes;
