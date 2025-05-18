import { useEffect, useRef } from 'react';

export function useDocumentTitle(title: string, keepOnUnmount = false) {
  const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    const originalTitle = defaultTitle.current;
    return () => {
      if (!keepOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [keepOnUnmount]);
}
