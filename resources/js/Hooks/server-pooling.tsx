import { router } from "@inertiajs/react";
import { useEffect } from "react";

export default function useServerPooling() {
  useEffect(() => {
    const interval = setInterval(() => router.reload(), 5000);
    return () => clearInterval(interval);
  }, []);
}
