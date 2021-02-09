import { EdgeInsets } from 'react-native-safe-area-context';

import LottieView from 'lottie-react-native';
import styled from 'styled-components/native';

export const Container = styled.View<{ insets: EdgeInsets; background?: string }>`
	flex: 1;
	position: relative;
	background-color: ${({ theme, background }) => background ?? theme.colors.backgroundLight};
	padding-top: ${({ insets }) => `${insets.top}px`};
	padding-bottom: ${({ insets }) => `${insets.bottom}px`};
	padding-left: 5px;
	padding-right: 5px;
	justify-content: center;
	align-items: center;
	align-content: space-between;
`;

export const BoxRefresh = styled.TouchableOpacity<{ insets: EdgeInsets }>`
	display: flex;
	position: absolute;
	right: 20px;
	top: ${({ insets }) => `${insets.top + 10}px`};
`;

export const BoxCity = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export const CityText = styled.Text`
	display: flex;
	font-family: 'Quicksand-Regular';
	font-size: ${({ theme }) => theme.fontSizes.xlarge}px;
	color: ${({ theme }) => theme.colors.text};
`;

export const BoxDateTime = styled.View`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export const DayText = styled.Text`
	display: flex;
	font-family: 'Quicksand-SemiBold';
	font-size: ${({ theme }) => theme.fontSizes.large}px;
	color: ${({ theme }) => theme.colors.text};
`;

export const BoxTemp = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export const LottieStyled = styled(LottieView)`
	display: flex;
	width: 250px;
	height: 250px;
`;

export const BoxTempText = styled.Text`
	display: flex;
	font-family: 'Quicksand-Regular';
	font-size: ${({ theme }) => theme.fontSizes.xxlarge}px;
	color: ${({ theme }) => theme.colors.text};
`;

export const BoxInfo = styled.View`
	display: flex;
	flex: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export const BoxInfoText = styled.Text`
	display: flex;
	font-family: 'Quicksand-Regular';
	font-size: ${({ theme }) => theme.fontSizes.medium}px;
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
`;

export const BoxInfoItem = styled.View`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export const BoxInfoLabel = styled.Text`
	display: flex;
	font-family: 'Quicksand-Regular';
	font-size: ${({ theme }) => theme.fontSizes.small}px;
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
`;

export const BoxLocationError = styled.View`
	display: flex;
	padding: 10px 20px;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	align-content: center;
`;

export const BoxLocationErrorText = styled.Text`
	display: flex;
	font-family: 'Quicksand-Regular';
	font-size: ${({ theme }) => theme.fontSizes.small}px;
	color: ${({ theme }) => theme.colors.text};
	text-align: center;
	margin-bottom: 20px;
`;

export const ButtonPermission = styled.TouchableOpacity`
	display: flex;
	padding: 10px 20px;
	border-radius: 5px;
	font-family: 'Quicksand-Bold';
	font-size: ${({ theme }) => theme.fontSizes.large}px;
	
	background-color: ${({ theme }) => theme.colors.text};
	text-align: center;
	text-transform: uppercase;
`;

export const ButtonPermissionText = styled.Text`
	display: flex;
	font-family: 'Quicksand-Regular';
	font-size: ${({ theme }) => theme.fontSizes.small}px;
	color: ${({ theme }) => theme.colors.background};
	text-align: center;
`;