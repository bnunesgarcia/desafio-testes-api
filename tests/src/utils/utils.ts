import * as crypto from 'crypto'

export function geraLogin (length: number): string {
    const randomString = crypto.randomBytes(length).toString('base64').slice(0, length);
    return `"${randomString}"`
  }

export function generateRandomEmail() {
    const randomFourDigits = Math.floor(1000 + Math.random() * 9000).toString();
    return `teste${randomFourDigits}@teste.com`;
}