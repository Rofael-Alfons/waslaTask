import { CognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoJwtVerifier } from "aws-jwt-verify";

const poolData = {
  UserPoolId: "eu-north-1_KpjKV5N2u",
  ClientId: "630kil7frkbbtjfip8av2u3nb8",
};

// Verifier that expects valid access tokens:
const verifier = CognitoJwtVerifier.create({
  userPoolId: "eu-north-1_KpjKV5N2u",
  tokenUse: "access",
  clientId: "630kil7frkbbtjfip8av2u3nb8",
});

export { verifier };
export default new CognitoUserPool(poolData);

// eyJraWQiOiIzd2phbTZSbHJOYzY1YjFWQk1tVWVKbkl2ZVgrVFFRWTZaTGZVblZhbVBvPSIsImFsZyI6IlJTMjU2In0
