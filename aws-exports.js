/* eslint-disable */
// WARNING: DO NOT EDIT. This file is automatically generated by AWS Amplify. It will be overwritten.

const awsmobile = {
	aws_project_region: 'ap-northeast-2',
	aws_cognito_region: 'ap-northeast-2',
	aws_user_pools_id: 'ap-northeast-2_V2jamxTob',
	aws_user_pools_web_client_id: '3lvkebff0907o3vuvm64i60uso',
	oauth: {
		domain: 'bside1512-dev.auth.ap-northeast-2.amazoncognito.com',
		scope: ['aws.cognito.signin.user.admin', 'email', 'openid'],
		redirectSignIn: 'http://localhost:3000/home',
		redirectSignOut: 'http://localhost:3000/home',
		responseType: 'code',
	},
	federationTarget: 'COGNITO_USER_POOLS',
	aws_cognito_username_attributes: ['EMAIL'],
	aws_cognito_social_providers: ['GOOGLE'],
	aws_cognito_signup_attributes: ['NICKNAME', 'EMAIL'],
	aws_cognito_mfa_configuration: 'OPTIONAL',
	aws_cognito_mfa_types: ['TOTP'],
	aws_cognito_password_protection_settings: {
		passwordPolicyMinLength: 8,
		passwordPolicyCharacters: ['REQUIRES_LOWERCASE', 'REQUIRES_UPPERCASE', 'REQUIRES_NUMBERS', 'REQUIRES_SYMBOLS'],
	},
	aws_cognito_verification_mechanisms: ['EMAIL'],
};

export default awsmobile;
