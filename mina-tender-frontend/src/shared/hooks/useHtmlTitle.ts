import { useEffect } from "react";

export const useHtmlTitle = (title: string) => {
  const originalTitle = "İstisu Admin Panel"

  useEffect(() => {
    document.title = originalTitle;
    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle;
    };
  }, []);
};