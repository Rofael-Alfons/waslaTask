import { CognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const poolData = {
  UserPoolId: "eu-north-1_gkqAD67fu",
  ClientId: "5echiavgqu51r1dvbp9t6jk752",
};

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: "eu-north-1_gkqAD67fu",
  tokenUse: "access",
  clientId: "5echiavgqu51r1dvbp9t6jk752",
});

export { verifier };
export default new CognitoUserPool(poolData);
