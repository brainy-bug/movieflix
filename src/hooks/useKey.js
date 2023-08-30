import { useEffect } from "react";

export default function useKey(key, cb) {
  useEffect(() => {
    function handleCallback(event) {
      if (event.code.toLowerCase() === key.toLowerCase()) {
        cb();
      }
    }
    document.addEventListener("keydown", handleCallback);
    return () => {
      document.removeEventListener("keydown", handleCallback);
    };
  }, [key, cb]);
}
