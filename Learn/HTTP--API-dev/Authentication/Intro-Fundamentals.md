# What is user authentication?
A security process that covers all of the human-to-computer interactions that require the user to register and log in.

> To become a student of a school, I register in that school, then I'm given an ID card, which I can always use to proof I'm a student of the school each time I want to gain access.

When a user registers for an account, they must create <u>a unique ID and key (referred to as **credentials**)</u> that will allow them to access their account later on.

Essentially, the user authentication process is what provides users repeat access to their own accounts while attempting to block any unauthenticated users from gaining access.

> **Staight Up definition 😎**\
> <u>User authentication</u> is the process of allowing or revoking user access to protected resources on the server, based on the validity of the provided credentials. (a.k.a Login)
>
> <u>Authorization</u> is the process of allowing or revoking an authenticated user's access to or action on protected resources on the server, based on user permissions.\
> --- OR ---\
> <u>Authorization</u> defines the boundary of what resources an authenticated user is allowed to access and what operations he's allowed to perform on the server. For example, an authenticated user must not be able to access another user's resources or perfom an admin-only operation on the server.

# How user authentication works?
In order to gain, access users must prove to the website that they are who they say they are. <u>The ID and key are enough to confirm the user's identity, which will allow the system to authorize the user</u>.

> **Authorization**\
It's important to note that **authorization**, on the other hand, <u>is what dictates what authenticated users are able to access and the operations they are allowed to perform</u>. It is the <u>process of **checking permission**</u>. In case of authorization failure, the server sends an HTTP `403 Forbidden` error response.

The process is as follows:
- Users input their credentials on the site's login form, and it is sent to the authentication server.
- The authentication server compares this credentials with the ones it has in store.
- When a match is found, the system will authenticate users and grant them access to their account; else, users will receive a credential error and asked to try again.
- After several unsuccessful attemps, the account may be flagged for suspicious activity or require alternative authentication methods such as a password reset or OTP.

# Why user authentication?
A secure user authentication keeps unathorized users from gaining access to sensitive inforamation, ensuring **data privacy**.

# Top user authentication methods
In order <u>for a user to confirm their identity</u>, **the user must provide <u>a piece of information that only the user and the server know</u>**. This information is called <u>**an authentication factor**</u>.

There are three categories of authentication factors:
- **Knowledge factors:** An information the user must know and remember. e.g. username, password, pin, security questions. *These factors can be weak in terms of security because they can be shared or guessed*.
- **Possession factors:** Something the user must have. e.g. soft tokens (OTP), key fobs, ID cards, hard tokens (an authentication device), USB, mobile device.
- **Inheritance factors:** Something the user is (i.e. biological characteristics) e.g. fingerprint, facial recognition, iris, voice.

All these authentication factors together can be generalized into <u>two super-categories</u>: **password-based** and **passwordless** authentication.

  - With **password-based** authentication, user has to provide a password known to the user and the server. **Less secure**.

  - > **Passwordless** authentication methods: 
    - **Biometrics:** <u>finger-print, facial-recognition, or iris</u>. Often considered one of the **most secure** options. Biological characteristics are unique can't be easily duplicated.
    - **Email/SMS:** <u>a code</u> to enter in the system or <u>a link</u> that redirects you back to the app (both verifying your identity) is sent to your email or phone number via SMS. 
      - **More secure** than password-based, less secure (but more reliable) than biometrics. Hackers could gain access to your email or phone number.


# How to improve user authentication?
- Encourage stronger passwords to improve security.
- Implement **SSO Authentication:** a process that lets you <u>remain logged in to an account even when you move to a different domain or server</u>. For example, log in on any google app once, and you'll automatically be logged in on other google apps.
- Enable a **multi-factor authentication(MFA)** strategy: one that verifies users' identities <u>using multiple methods of authentication</u>. e.g. from password-based authentication to one or two more passwordless authentication.
  - The famous 2FA, is the same as MFA, with the mandate that there must be exactly two authentication factors involved.

- Explore passowordless authentication
