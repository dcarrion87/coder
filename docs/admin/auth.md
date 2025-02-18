# Authentication

By default, Coder is accessible via password authentication.

The following steps explain how to set up GitHub OAuth or OpenID Connect.

## GitHub

### Step 1: Configure the OAuth application in GitHub

First, [register a GitHub OAuth app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/). GitHub will ask you for the following Coder parameters:

- **Homepage URL**: Set to your Coder domain (e.g. `https://coder.domain.com`)
- **User Authorization Callback URL**: Set to `https://coder.domain.com/api/v2/users/oauth2/github/callback`

Note the Client ID and Client Secret generated by GitHub. You will use these
values in the next step.

### Step 2: Configure Coder with the OAuth credentials

Navigate to your Coder host and run the following command to start up the Coder
server:

```console
coder server --oauth2-github-allow-signups=true --oauth2-github-allowed-orgs="your-org" --oauth2-github-client-id="8d1...e05" --oauth2-github-client-secret="57ebc9...02c24c"
```

> For GitHub Enterprise support, specify the `--oauth2-github-enterprise-base-url` flag.

Alternatively, if you are running Coder as a system service, you can achieve the
same result as the command above by adding the following environment variables
to the `/etc/coder.d/coder.env` file:

```console
CODER_OAUTH2_GITHUB_ALLOW_SIGNUPS=true
CODER_OAUTH2_GITHUB_ALLOWED_ORGS="your-org"
CODER_OAUTH2_GITHUB_CLIENT_ID="8d1...e05"
CODER_OAUTH2_GITHUB_CLIENT_SECRET="57ebc9...02c24c"
```

**Note:** To allow everyone to signup using GitHub, set:

```console
CODER_OAUTH2_GITHUB_ALLOW_EVERYONE=true
```

Once complete, run `sudo service coder restart` to reboot Coder.

## OpenID Connect with Google

> We describe how to set up the most popular OIDC provider, Google, but any (Okta, Azure Active Directory, GitLab, Auth0, etc.) may be used.

### Step 1: Configure the OAuth application on Google Cloud

First, [register a Google OAuth app](https://support.google.com/cloud/answer/6158849?hl=en). Google will ask you for the following Coder parameters:

- **Authorized JavaScript origins**: Set to your Coder domain (e.g. `https://coder.domain.com`)
- **Redirect URIs**: Set to `https://coder.domain.com/api/v2/users/oidc/callback`

### Step 2: Configure Coder with the OpenID Connect credentials

Navigate to your Coder host and run the following command to start up the Coder
server:

```console
coder server --oidc-issuer-url="https://accounts.google.com" --oidc-email-domain="your-domain" --oidc-client-id="533...ent.com" --oidc-client-secret="G0CSP...7qSM"
```

Alternatively, if you are running Coder as a system service, you can achieve the
same result as the command above by adding the following environment variables
to the `/etc/coder.d/coder.env` file:

```console
CODER_OIDC_ISSUER_URL="https://accounts.google.com"
CODER_OIDC_EMAIL_DOMAIN="your-domain"
CODER_OIDC_CLIENT_ID="533...ent.com"
CODER_OIDC_CLIENT_SECRET="G0CSP...7qSM"
```

Once complete, run `sudo service coder restart` to reboot Coder.

> When a new user is created, the `preferred_username` claim becomes the username. If this claim is empty, the email address will be stripped of the domain, and become the username (e.g. `example@coder.com` becomes `example`).

If your OpenID Connect provider requires client TLS certificates for authentication, you can configure them like so:

```console
CODER_TLS_CLIENT_CERT_FILE=/path/to/cert.pem
CODER_TLS_CLIENT_KEY_FILE=/path/to/key.pem
```

Coder requires all OIDC email addresses to be verified by default. If the `email_verified` claim is present in the token response from the identity provider, Coder will validate that its value is `true`.
If needed, you can disable this behavior with the following setting:

```console
CODER_OIDC_IGNORE_EMAIL_VERIFIED=true
```

> **Note:** This will cause Coder to implicitly treat all OIDC emails as "verified".

## SCIM (enterprise)

Coder supports user provisioning and deprovisioning via SCIM 2.0 with header
authentication. Upon deactivation, users are [suspended](./users.md#suspend-a-user)
and are not deleted. [Configure](./configure.md) your SCIM application with an
auth key and supply it the Coder server.

```console
CODER_SCIM_API_KEY="your-api-key"
```
