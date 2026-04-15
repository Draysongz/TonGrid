import { useEffect, useState } from "react";


export function useAsyncInitialize<T>(func:() => Promise<T>, deps?: any[]): T | undefined {

    const [data, setData] = useState<T>()

    useEffect(() => {
        (async () => {
            const data = await func()
            setData(data)
        })()
    }, deps)

    return data
}