export class EncryptService {
    static DigestSHA256(value: string): Promise<string> {
        const codeEncrypted = crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)).then((buffer) => {
            return Array.prototype.map.call(new Uint8Array(buffer), (x) => ('00' + x.toString(16)).slice(-2)).join('');
        })
        return codeEncrypted
    }
}