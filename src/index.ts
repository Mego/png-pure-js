import { lanczos } from '@rgba-image/lanczos'
import { fromPng, toPng } from '@rgba-image/png'
import { createImage } from '@rgba-image/create-image'

export default class PNG {
    img: ImageData
    private constructor(img: ImageData) {
        this.img = img
    }

    static fromBase64 = (base64: string) =>
        PNG.fromBuffer(Buffer.from(base64, 'base64'))

    static fromBuffer = (buf: Buffer) => new PNG(fromPng(buf))

    toBuffer = () => Buffer.from(toPng(this.img))

    toBase64 = () => this.toBuffer().toString('base64')

    resize = (width: number, height: number) => {
        const out = createImage(width, height)
        lanczos(this.img, out)
        return new PNG(out)
    }
}
