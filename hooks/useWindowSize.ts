import {useEffect, useState} from "react";

export default function useWindowSize() {

    interface windowInterface {
        width: number | undefined,
        height: number | undefined,
    }

    const [windowSize, setWindowSize] = useState<windowInterface>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        function handleResize() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return windowSize;
}