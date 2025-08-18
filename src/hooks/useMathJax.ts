import { useCallback, useRef } from 'react';

interface MathJaxHookOptions {
  retryLimit?: number;
  retryDelay?: number;
}

export const useMathJax = (options: MathJaxHookOptions = {}) => {
  const { retryLimit = 3, retryDelay = 100 } = options;
  const renderingRef = useRef(new Set<string>());

  const renderElement = useCallback(async (
    element: HTMLElement,
    retryCount = 0
  ): Promise<void> => {
    if (!window.MathJax || retryCount > retryLimit) return;

    const elementId = element.id || `math-${Date.now()}-${Math.random()}`;

    // 同じ要素が既にレンダリング中の場合はスキップ
    if (renderingRef.current.has(elementId)) return;

    renderingRef.current.add(elementId);

    try {
      await window.MathJax.typeset([element]);
      element.classList.add('rendered');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      if (errorMessage.includes('retry') && retryCount < retryLimit) {
        setTimeout(() => renderElement(element, retryCount + 1), retryDelay);
      } else {
        // エラーでも表示
        element.classList.add('rendered');
      }
    } finally {
      renderingRef.current.delete(elementId);
    }
  }, [retryLimit, retryDelay]);

  const renderElements = useCallback(async (elements: HTMLElement[]): Promise<void> => {
    if (!window.MathJax || elements.length === 0) return;

    try {
      // バッチ処理で効率化
      await window.MathJax.typeset(elements);
      elements.forEach(element => element.classList.add('rendered'));
    } catch (error) {
      // バッチ処理に失敗した場合は個別処理
      for (const element of elements) {
        await renderElement(element);
      }
    }
  }, [renderElement]);

  const renderBySelector = useCallback(async (selector: string): Promise<void> => {
    const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
    await renderElements(Array.from(elements));
  }, [renderElements]);

  return {
    renderElement,
    renderElements,
    renderBySelector
  };
};
