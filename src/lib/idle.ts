// Brauzer bo'sh qolganda (birinchi chizish va LCP dan keyin) bajariladi: pastki bo'limlarning JS i
// sahifaning kritik yo'liga tushmaydi. Safari'da requestIdleCallback yo'q — qisqa setTimeout zaxira.
export function idle(timeout = 2000): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => resolve(), { timeout });
    else setTimeout(resolve, 200);
  });
}
