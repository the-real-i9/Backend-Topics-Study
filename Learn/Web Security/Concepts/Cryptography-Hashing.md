# Digital Cryptography
Crytography is the art and science of <u>encoding/**encrypting**/enciphering and decoding/**decrypting**/deciphering **messages needed to be exchanged secretly** between two parties</u>.

Cryptography <u>can do more</u> than just encrypt messages:
- It can be used to **verify information**, to prevent tampering with messages exchanged.
- It can also be used to **prove identity**

These two are collectively known as *signature verification*, and <u>they are particularly important to SSL/TLS</u>.

The table below summarizes these 3 major uses of cryptography, the service each provide and the attack each protects against.
| Use | Service | Protects Against |
|---|---|---|
| **Keeping Secrets** | Confidentiality | Eavesdropping |
| **Proving identity** | Authentication | Forgery and masquerade |
| **Verifying information** | Message integrity | Alteration |

## Ciphers
Ciphers are cryptograhic hashes (hashing algorithms, hash functions) used to encrypt information, to make it unreadable. 
- The readable information to be encrypted is referred to as *plaintext*, while the resulting unreadable information is referred to as *ciphertext*.

## Keys
The algorithms used by ciphers are not secret and can be known to anybody. Thus, <u>with a cipher alone, encryption is pointless</u>, even though a ciphertext is unreadable, anyone who knows the algorithm can decrypt the ciphertext and expose the so-called secret information.

A key is an information that changes the behaviour of a cipher. The original behaviour of a cipher is according to its algorithm, but with the introduction of <u>a dynamic parameter (**a key**, in which anyone who wishes to use the cipher can decide its value)</u>, anyone can change the original, purely algorithmic behaviour or the ciper.

- The algorithm of ciphers can't change and can be widely known, **but** (*to make meaning of ciphers*), <u>a key can be a secret, known only to the communicating parties</u>. So even though the original behaviour of a cipher is predictable to the public, it becomes unpredictable with a key unknown to the public, except to the party(ies) that knows this secret key.
- This way, only the party(ies) that knows the key can decrypt the ciphertext.

With keys as inputs to hashing algorithms, a cipher can now take a chunk of data and encrypt/decrypt it based on its algorithm and the value a key.

**The effectiveness of a cipher** is the <u>size of the secret key</u> used. The larger the key, the more combinations of encodings are possible, and the more difficult it is to break the code by randomly guessing keys.
- Imagine a 5-character key is used. All a bad guy has to do it to generate all possible combination of five characters.

## Symmetric-Key/Secret-Key Cryptography
A kind of crytography in which the same key value is used for both encryption and decryption, and thus, both communicating parties need to know this same shared secret key.

The sender uses this shared secret key to encrypt a message, and the receiver uses this same key to decrypt the message.

### Establishing Shared Keys
One of the disadvantage of symmetric-key ciphers is that both communicating parties have to have a shared secret key before they can talk to each other. <u>Two dreadful issues ensue:</u>
- How would the secret key be exchanged/shared secretly in the first place? What if the two communicating parties can't meet physically?
- A sender has to have a unique secret key for each one it wishes to communicate with. Every pair of communication needs its own prive key. This is a nightmare.

## Public-Key Cryptography
This kind of cryptography uses two asymmetric keys, one for encryption and the other for decryption. The encrypting key is publicly known to the world, but only the host knows the private decypting key.

A host who wants to receive a secret information, creates these two asymemtric keys, 
- one **public**, which he publishes and 
- the other **private**, which it keeps privately to itself.

> These two keys have a mathematical relationship such that, whatever the public key enciphers, only the private key can decipher. Some public-key cryptographic systems can even do the reverse, such as the RSA encryption, which is the most used today.

A sender who wishes to communicate to a receiver finds the public key of the receiver, uses it to encrypt the message and sends it to the receiver. The receiver then uses her private key to decrypt the message.
> The public key cannot decrypt what it encrypts, so even the sender cannot decrypt the message.

### RSA
The challenge of any public-key asymmetric cryptosystem is to make sure no bad guy can compute the secret, private key - even if he has all other clues.

One popular public-key cryptosystem that meets all these needs is the RSA algorithm.

> This is the algorithm commonly used today for public-key cryptography or public/private key cryptography. <,>It's even the the one in use with SSL/TLS</u>.

As previously mentioned, **this algorithm can also work in reverse**. Information encrypted with a private key can be decrypted with the corresponding public key. This feature has several powerful applications, most importantly for SSL, <u>as a way to prove identity</u>.
- A receiver can prove that the author of an information is true using the author's public key. If the message fails decryption then the author was impersonated by someone who obviously doesn't know the author's private key, the information wasn't encrypted by the author, as claimed, meaning the author isn't the original owner. But if it succeeds, then the author is true, the author is the true owner of the message as she has encrypted it with her private key. Only the author's public key can successfully decrypt what the author's private key has encrypted.
- The author of a message can use its private key to create a signature and attach it to the message. The signature is the resulting ciphertext from the encryption of this message with the author's private key. A receiver uses the author's public key to decrypt the signature, if the resulting plaintext is same as the accompanied message, then the author's identify is proven.

## Combining Secret and Public Key Cryptography
Public-key cryptography algorithms are extremely complex and slow.

In practice, mixtures of both symmetric and asymmetric schemes are used.
- Public-key cryptography is first used to conviniently set up secure communication between nodes,
- now that secure channel is used to generate and communicate a temporary, random symmetric key 
- which is then used to encrypt the rest of the data through faster symmetric cryptography.

Recollect that one of the problems with symmetric cryptography is how the shared key will be secretly exchanged. This combination technique solves the issue. And then, the second issue doesn't even come into play here, since the symmetric-key is temporary.

## Digital signatures

# Key management
How can be sure that a public-key is coming from a reliable source? What if a public-key, owned by a bad guy, claims ownership from someone you know dearly?

The need to be certain that a public key is coming from a reliable source, led to the creation of public-key certificates and certificate authorities.

## Public key certificates or Digital Certificates
A certificate issued by a trusted (or an untrusted) organization that <u>validates (vouches for) a subject's (server's) public key</u>, as one from a reliable source. A trusted organization is known as a certificate authority.

> Anyone can create a digital certificate, but not everyone can get a well-respected-signing authority to vouch for the certificate's information (one of which is the subject's public-key) and sign the certificate with its private key.

The contents of a typical public key certificate (important ones only):
- > The **issuer** field,
  
  which identifies the organization that has issued the certificate (i.e. <u>the certificate authority</u>). This information is <u>critical to the computer system (web browser) that examines the certificate</u> because it **determines whether the certificate can be trusted**.

- > The **period of validity**,

  which identifies the certificate's time to expiration.

- > The **subject** of the certificate,

  which identifies who the certificate is issued to. Basically this is the server you want to establish an HTTPS connection with.

- > The **subject's public key**,

  which the user agent and server uses to exchange secret information.

- > The issuer's **signature**,

  which is a digital signature of the contents of the certificate. The  **issuer creates this signature by encrypting a hash of the cerficate with its private key**. <u>Any system that knows the issuer's public key can verify the signature and ensure the validity of the certificate</u>. Since the identity of the trusted certificate authority is proven. This in particular is what's needed to establish a secure communication channel.

> Unfortunately, there is no single, **universal standard for digital certificates**. The good news is that <u>most certificates in use today store their information in a standard form, called **X.509 v3**</u>. This form provides a standard way of structuring certificate informationi into parseable fields.

## Using Certificates to Authenticate Servers
When you establish a secure web transaction through HTTPS, modern browsers automatically fetch the digital certificate for the server being connected to.
- If the server does not have a certificate, the secure connection fails.
- The server certificate contains many fields, including:
  - Name and hostname of the web site
  - Public key of the web site
  - Name of the issuer (CA)
  - The issuer's signature.
- When the browser receives the certificate, it checks the issuer. If it is a public, well-respected certificate authority, the browser will already know its public key (browsers ship with certificates of many signing authorities preinstalled), so it can verify the issuer's signature.
- If the certificate authority is unknown, the browser isn't sure if it should trust the CA and usually displays a dialog box for the user to read and see if he trusts the CA.

---

# Hashing Algorithms
