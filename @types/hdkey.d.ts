interface HDKey {
  derive: (path: string) => HDKey
  sign: (hash: Uint8Array) => Uint8Array
  verify: (hash: Uint8Array, signature: Uint8Array) => boolean
  wipePrivateData: () => HDKey
  toJSON: () => any
  privateKey: Uint8Array
  publicKey: Uint8Array
  privateExtendedKey: string
  publicExtendedKey: string
}

declare module 'hdkey' {
  export default class HDK {
    constructor();
    static fromMasterSeed(seed: Buffer): HDKey
    static fromExtendedKey(extendedKey: string): HDKey
    static fromJSON(json: object): HDKey
 
  }
}