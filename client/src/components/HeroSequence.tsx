import { useEffect, useRef, useState } from "react";
import { useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";

const frameCount = 80;
const frames = Array.from({ length: frameCount }, (_, i) =>
    `/hero_seq/Fruits_falling_out_of_bowl_delpmaspu__${String(i).padStart(3, "0")}.jpg`
);

interface HeroSequenceProps {
    className?: string;
    progress: MotionValue<number>;
}

export function HeroSequence({ className, progress }: HeroSequenceProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);

    // Map flattened scroll progress (0 to 1) to frame index (0 to 14)
    // round() is important here to snap to integer frames, but we allow 
    // the spring to handle the smoothness between integers if we were blending.
    // Since we are not blending opacity, we just track the index.
    const frameIndex = useTransform(progress, [0, 1], [0, frameCount - 1]);

    // High-Performance Image Preloading
    useEffect(() => {
        let isMounted = true;

        const preloadImages = async () => {
            const promises = frames.map((src) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = () => resolve(img);
                    img.onerror = reject;
                });
            });

            try {
                const loadedImages = await Promise.all(promises);
                if (isMounted) {
                    setImages(loadedImages);
                    setLoaded(true);
                }
            } catch (error) {
                console.error("Failed to preload sequence images", error);
            }
        };

        preloadImages();

        return () => {
            isMounted = false;
        };
    }, []);

    // Optimized Render Function with Interpolation (Blending)
    const render = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !loaded || images.length === 0) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Calculate current and next frame
        // We use Math.floor for the base frame, and the decimal part for blending
        const clampedIndex = Math.max(0, Math.min(index, frameCount - 1));
        const frameAIndex = Math.floor(clampedIndex);
        const frameBIndex = Math.min(frameAIndex + 1, frameCount - 1);

        const blend = clampedIndex - frameAIndex; // 0.0 to 1.0

        const imgA = images[frameAIndex];
        const imgB = images[frameBIndex];

        if (!imgA) return;

        // Helper to draw an image 'cover' style
        const drawImageCover = (img: HTMLImageElement, opacity: number) => {
            const imgRatio = img.width / img.height;
            const canvasRatio = canvasWidth / canvasHeight; // Canvas is already DPR scaled? No, logic uses .width/.height

            // Need to re-calculate ratios based on actual dimensions
            // The logic below relies on imgRatio vs canvasRatio

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawHeight = canvasHeight;
                drawWidth = imgRatio * canvasHeight;
                offsetY = 0;
                offsetX = (canvasWidth - drawWidth) / 2;
            } else {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                offsetX = 0;
                offsetY = (canvasHeight - drawHeight) / 2;
            }

            ctx.globalAlpha = opacity;
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        };

        // Draw Frame A (Bottom) - Always full opacity if it's the base, 
        // but typically valid to just draw it opaque and then draw B on top.
        // Clearing canvas strictly needed if transparency involved or aspect ratios differ wildly.
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        ctx.save();
        drawImageCover(imgA, 1);
        ctx.restore();

        // Draw Frame B (Top) - with blend opacity
        if (frameAIndex !== frameBIndex && imgB) {
            ctx.save();
            drawImageCover(imgB, blend);
            ctx.restore();
        }
    };

    // Render Loop using requestAnimationFrame
    useMotionValueEvent(frameIndex, "change", (latest) => {
        requestAnimationFrame(() => render(latest));
    });

    // Handle Resize & Init
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (canvas) {
                const rect = canvas.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;

                if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
                    canvas.width = rect.width * dpr;
                    canvas.height = rect.height * dpr;

                    if (loaded) {
                        render(frameIndex.get());
                    }
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        if (loaded) {
            render(frameIndex.get());
        }

        return () => window.removeEventListener("resize", handleResize);
    }, [loaded]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{ display: "block", width: "100%", height: "100%" }}
        />
    );
}
