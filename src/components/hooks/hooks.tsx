import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
};
