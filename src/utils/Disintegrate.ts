// 元素沙化工具类
import html2canvas from 'html2canvas'

export interface DisintegrateOptions {
    count?: number
    translate?: { x: number; y: number }
    rotate?: number
    duration?: number
    callback?: () => void
}

export default class Disintegrate {
    /**
     * @param ele 需要沙化的元素
     * @param options 配置项
     */
    static async apply(ele: HTMLElement, options: DisintegrateOptions = {}): Promise<void> {
        const COUNT = options.count ?? 32
        const translateX = options.translate?.x ?? 60
        const translateY = options.translate?.y ?? 30
        const rotateDeg = options.rotate ?? 15
        const duration = options.duration ?? 1
        const callback = options.callback ?? (() => {})

        if (!ele) return

        const domCanvas = await html2canvas(ele)
        const { width, height } = domCanvas

        const ctx = domCanvas.getContext('2d')
        if (!ctx) return
        const originalFrame = ctx.getImageData(0, 0, width, height)

        // 创建 COUNT 个 ImageData
        const frames: ImageData[] = []
        for (let i = 0; i < COUNT; i++) frames[i] = ctx.createImageData(width, height)

        // 随机分配像素
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const frameIndex = Math.floor((COUNT * (Math.random() + (2 * x) / width)) / 3)
                const pixelIndex = 4 * (y * width + x)
                for (let offset = 0; offset < 4; offset++) {
                    frames[frameIndex].data[pixelIndex + offset] = originalFrame.data[pixelIndex + offset]
                }
            }
        }

        // 创建容器
        const container = document.createElement('div')
        container.style.position = 'absolute'
        container.style.left = `${ele.offsetLeft}px`
        container.style.top = `${ele.offsetTop}px`
        container.style.width = `${width}px`
        container.style.height = `${height}px`
        container.style.pointerEvents = 'none'
        container.style.zIndex = '9999'

        const frames2Doms: HTMLCanvasElement[] = frames.map((frameData, i) => {
            const canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            const ctx2 = canvas.getContext('2d')
            if (ctx2) ctx2.putImageData(frameData, 0, 0)
            canvas.style.position = 'absolute'
            canvas.style.left = '0px'
            canvas.style.top = '0px'
            canvas.style.transition = `all ${duration}s ease`
            canvas.style.transitionDelay = `${(duration * i) / COUNT}s`
            container.appendChild(canvas)
            return canvas
        })

        ele.style.visibility = 'hidden'
        ele.parentElement?.appendChild(container)

        requestAnimationFrame(() => {
            frames2Doms.forEach(item => {
                const angle = 2 * Math.PI * (Math.random() - 0.5)
                item.style.transform = `
          rotate(${rotateDeg * (Math.random() - 0.5)}deg)
          translate(${translateX * Math.cos(angle)}px, ${translateY * Math.sin(angle)}px)
          rotate(${-rotateDeg * (Math.random() - 0.5)}deg)
        `
                item.style.opacity = '0'
            })
        })

        setTimeout(() => {
            container.remove()
            ele.remove()
            callback()
        }, (duration + 0.5) * 1000)
    }
}
