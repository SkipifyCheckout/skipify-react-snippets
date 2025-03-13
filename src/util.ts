/* eslint-disable @typescript-eslint/no-explicit-any */
const merchantId = import.meta.env.VITE_MERCHANT_ID

let skipifyClient: any = null;

export const getSkipifyClient = () => {
    if (skipifyClient) {
        return skipifyClient;
    } else {
        skipifyClient = new (window as any).skipify({
            merchantId,
        })
        return skipifyClient;
    }
}