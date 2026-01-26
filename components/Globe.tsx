"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { useSpring } from "react-spring";

export default function Globe({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pointerInteracting = useRef<number | null>(null);
    const pointerInteractionMovement = useRef(0);
    const [{ r }, api] = useSpring(() => ({
        r: 0,
        config: {
            mass: 1,
            tension: 280,
            friction: 40,
            precision: 0.001,
        },
    }));

    useEffect(() => {
        let phi = 0;
        let width = 0;
        const onResize = () =>
            canvasRef.current && (width = canvasRef.current.offsetWidth);
        window.addEventListener("resize", onResize);
        onResize();

        const globe = createGlobe(canvasRef.current!, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 0.8,
            diffuse: 0.8,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [50 / 255, 50 / 255, 50 / 255],
            markerColor: [10 / 255, 132 / 255, 255 / 255],
            glowColor: [0, 0, 0],
            markers: [
                // Brasil
                { location: [-15.8267, -47.9218], size: 0.032 }, // Brasília, Brasil
                // Estados Unidos
                { location: [38.9072, -77.0369], size: 0.032 }, // Washington DC, EUA
                // Portugal
                { location: [38.7223, -9.1393], size: 0.032 }, // Lisboa, Portugal
                // Alemanha
                { location: [52.52, 13.405], size: 0.032 }, // Berlim, Alemanha
                // Holanda
                { location: [52.3676, 4.9041], size: 0.032 }, // Amsterdã, Holanda
                // Argentina
                { location: [-34.6037, -58.3816], size: 0.032 }, // Buenos Aires, Argentina
                // Uruguai
                { location: [-34.9011, -56.1645], size: 0.032 }, // Montevidéu, Uruguai
                // Irlanda
                { location: [53.3498, -6.2603], size: 0.032 }, // Dublin, Irlanda
                // Angola
                { location: [-8.8383, 13.2344], size: 0.032 }, // Luanda, Angola
                // Reino Unido
                { location: [51.5074, -0.1278], size: 0.032 }, // Londres, Reino Unido
                // Bélgica
                { location: [50.8503, 4.3517], size: 0.032 }, // Bruxelas, Bélgica
                // Paraguai
                { location: [-25.2637, -57.5759], size: 0.032 }, // Assunção, Paraguai
                // Suíça
                { location: [46.9480, 7.4474], size: 0.032 }, // Berna, Suíça
                // Polônia
                { location: [52.2297, 21.0122], size: 0.032 }, // Varsóvia, Polônia
                // Moçambique
                { location: [-25.9655, 32.5832], size: 0.032 }, // Maputo, Moçambique
                // México
                { location: [19.4326, -99.1332], size: 0.032 }, // Cidade do México
                // França
                { location: [48.8566, 2.3522], size: 0.032 }, // Paris, França
                // Malásia
                { location: [3.139, 101.6869], size: 0.032 }, // Kuala Lumpur, Malásia
                // Chile
                { location: [-33.4489, -70.6693], size: 0.032 }, // Santiago, Chile
                // Israel
                { location: [31.7683, 35.2137], size: 0.032 }, // Jerusalém, Israel
                // Equador
                { location: [-0.1807, -78.4678], size: 0.032 }, // Quito, Equador
                // Austrália
                { location: [-35.2809, 149.1300], size: 0.032 }, // Canberra, Austrália
                // Canadá
                { location: [45.4215, -75.6972], size: 0.032 }, // Ottawa, Canadá
                // Itália
                { location: [41.9028, 12.4964], size: 0.032 }, // Roma, Itália
                // Peru
                { location: [-12.0464, -77.0428], size: 0.032 }, // Lima, Peru
                // Áustria
                { location: [48.2082, 16.3738], size: 0.032 }, // Viena, Áustria
                // Panamá
                { location: [8.9824, -79.5199], size: 0.032 }, // Cidade do Panamá
            ],
            onRender: (state) => {
                if (!pointerInteracting.current) {
                    phi += 0.0024;
                }
                state.phi = phi + r.get();
                state.width = width * 2;
                state.height = width * 2;
            },
        });

        setTimeout(() => {
            if (canvasRef.current) {
                canvasRef.current.style.opacity = "1";
            }
        });

        return () => {
            globe.destroy();
            window.removeEventListener("resize", onResize);
        };
    }, [r]);

    return (
        <div className={className}>
            <canvas
                ref={canvasRef}
                onPointerDown={(e) => {
                    pointerInteracting.current =
                        e.clientX - pointerInteractionMovement.current;
                    canvasRef.current!.style.cursor = "grabbing";
                }}
                onPointerUp={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = "grab";
                }}
                onPointerOut={() => {
                    pointerInteracting.current = null;
                    canvasRef.current!.style.cursor = "grab";
                }}
                onMouseMove={(e) => {
                    if (pointerInteracting.current !== null) {
                        const delta = e.clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 200,
                        });
                    }
                }}
                onTouchMove={(e) => {
                    if (pointerInteracting.current !== null && e.targetTouches[0]) {
                        const delta = e.targetTouches[0].clientX - pointerInteracting.current;
                        pointerInteractionMovement.current = delta;
                        api.start({
                            r: delta / 100,
                        });
                    }
                }}
                style={{
                    width: "100%",
                    height: "100%",
                    cursor: "grab",
                    contain: "layout paint size",
                    opacity: 0,
                    transition: "opacity 1s ease",
                }}
            />
        </div>
    );
}
