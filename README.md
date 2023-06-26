
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

- In order to make Oauth we're going to need a sequence of flows. First we need to redirect the user to the correct url to get the authorizationCode from the /authorize in the Authorization server.
- put the  code_challenge as query parameter and that should  be generated on the front-end (there is an example on how to do it below). To increase security generate a random 32 chars in length and send it in the `state` query param.

###

``` GET /authorize/{AuthServerName}/?codeChallenge={codeChallenge}&state={state} ```

###

- The user will be redirected to the IDp (identity provider). User will authenticate if needed in the IDp and will be redirected to the app with the `authorization code` . `{frontend_redirectURL}/?authorizationCode={authorizationCode}&state={state}`
- In the frontend This `authorization_code` should be sent to the backend  with the code_verifier in an POST request. `POST /token/{AuthServerName}/ body: { "code_verifier": 1232131313232132131321321312, "authorizationCode": "authorizationCode"}`
- Response to `/token` will contain `access_token` and `ID_token` from Zuum API.

** In all Auth provider we have a key called code_verifier and other called code_challenge. `code_verifier` is a random generated string with 32 chars in length. `code_challenge` is the `code_verifier` after it is hashed and digested in base64 replacing the unsuporte chars.

### Generate code_verifier and code challenge with @Okta/okta-auth-js and createHash from crypto API ###

```
const code_verifier = new OktaAuth(
            {
                issuer: loginPayload?.authProviderURI,
                clientId: loginPayload?.clientID,
                redirectUri: loginPayload?.redirectURI,
            }
        ).pkce.generateVerifier(code);
        const code_challenge = createHash('sha256').update(code_verifier).digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
```

### GET /authorize/ ###
