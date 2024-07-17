const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Générer une clé privée RSA (2048 bits) en base64
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
        cipher: 'aes-256-cbc',
        passphrase: 'top secret'
    }
});

// Créer un certificat auto-signé en base64
const cert = `-----BEGIN CERTIFICATE-----
MIIC7jCCAqegAwIBAgIJAKFkOu9j5BZrMA0GCSqGSIb3DQEBCwUAMBMxETAPBgNV
BAMMCGxvY2FsaG9zdDAeFw0yMjA3MTYxNjMzNDZaFw0zMjA3MTMxNjMzNDZaMBMx
ETAPBgNVBAMMCGxvY2FsaG9zdDCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoC
ggEBALHDnQ+pdgb5b8Cm18b3yY81sKyK2TKmywIf0Ttx0ESt4I9sL+0YRpy1hLjs
wLftj+TVb+OxI6lxv+Ibr8A0k0+08DTrdAjTjVHq7h4HhoIc9O5Cf/3BZ5CTH+q6
CqQUF/f/Z6Rv4Udu1otOYf2U9bU2Rr3Q1OFJ2pTw3sHHe+24JgZJz3EGrxHqCR5Z
7/pzrQopCYzntNoB3DLM2ZPAZdC3W1tFXV6c2Hx02qonN6WzS2L6rEiM0i8B3AcD
2k3ut8bNexV8Q8QovLjYbHGLdRr8ZXwFTB8mqpDUpFpC7N6qsg7fF7mmXAvPbd/h
Gr+jX/y2hOMAcDw2BZfKf/MCAwEAAaNQME4wHQYDVR0OBBYEFHYSNBmO7ueK6JN/
vYh+zRQxWdXoMB8GA1UdIwQYMBaAFHYSNBmO7ueK6JN/vYh+zRQxWdXoMAwGA1Ud
EwQFMAMBAf8wDQYJKoZIhvcNAQELBQADggEBAHw3wO5Gie4hP5tJlMzw3f+FNJmD
cE8/kU9SbENi2WIsEMw6Pz6sW/ZR0aEs5roS+1eG/sNkVq4i0eGfYZ9TljQ22cGz
M5x4UCLoQaBj3quzOyGHUJ01VzhNisjYc01yZTxZ5DiNB0YJLO4lOjUNAO2XqWd4
GVLwOdV2bKlKXx9a7CAvZIY6iZbL7HR0ZzGvKoKb4xM2NU7CJnGw4Vt1hGmbR1So
e3PeI0HJrGe5+DB9ZfwKzGkK4c5QSHzOjRLV8FnCwEMICLceLTGmXf0nm9i1l8lk
HZ8L/q+v8V5BpUUPaCoPc6awQm8E8NT+w7H3Ew21ZCHW8oTgQocC6eY=
-----END CERTIFICATE-----`;

// Convertir les clés en base64
const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
const publicKeyBase64 = Buffer.from(publicKey).toString('base64');
const certBase64 = Buffer.from(cert).toString('base64');

// Écrire la clé privée et le certificat en base64 dans des fichiers
fs.writeFileSync(path.join(__dirname, 'server.key'), privateKeyBase64);
fs.writeFileSync(path.join(__dirname, 'server.cert'), certBase64);

console.log('Certificat et clé privée en base64 générés avec succès !');
