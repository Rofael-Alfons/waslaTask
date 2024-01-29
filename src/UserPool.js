import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-north-1_ScIPHgUJm",
  ClientId: "6chh9n88t3qi51qeg71vr36eqb",
};

export default new CognitoUserPool(poolData);
