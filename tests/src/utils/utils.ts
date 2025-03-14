import * as crypto from 'crypto'

export function geraLogin (length: number): string {
    const randomString = crypto.randomBytes(length).toString('base64').slice(0, length);
    return `"${randomString}"`
  }