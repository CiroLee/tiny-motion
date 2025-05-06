import { useCallback, useEffect, useRef } from 'react';
import { DOMElement } from './types';
type MotionCallback = (target: DOMElement) => void;
interface InViewOptions extends IntersectionObserverInit {
  once?: boolean;
}
interface UseInViewProps<T> {
  selectors?: string[];
  refs?: React.RefObject<T | null>[];
  enter?: MotionCallback;
  leave?: MotionCallback;
  options?: InViewOptions;
}
interface CreateObserverOptions extends InViewOptions {
  enter?: MotionCallback;
  leave?: MotionCallback;
}

function createObserver(target: DOMElement, options: CreateObserverOptions) {
  const { once = false, enter, leave, ...opt } = options || {};
  let hasTriggered = false;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!hasTriggered) {
        enter?.(target);
        if (once) {
          hasTriggered = true;
          observer.unobserve(target);
        }
      }
    } else {
      if (!once || !hasTriggered) {
        leave?.(target);
      }
    }
  }, opt);

  if (target) {
    observer.observe(target);
  }

  return observer;
}

export function useInView<T extends DOMElement>(props: UseInViewProps<T>) {
  const { refs, selectors, enter, leave, options } = props;
  const targets = useRef<T[]>(null);
  const observers = useRef<IntersectionObserver[]>([]);
  const getTargets = useCallback(() => {
    if (refs) {
      return refs.map((ref) => ref.current as T);
    }
    if (Array.isArray(selectors)) {
      const list: T[] = [];
      selectors.forEach((selector) => {
        list.push(...document.querySelectorAll<T>(selector));
      });
      return list;
    }
  }, [refs, selectors]);
  useEffect(() => {
    const newTargets = getTargets();
    if (!newTargets) {
      throw new Error('useInView: selectors or refs must resolve to at least one DOM element');
    }
    targets.current = newTargets;

    observers.current = targets.current.map((target) =>
      createObserver(target, {
        ...options,
        enter,
        leave
      })
    );

    return () => {
      observers.current.forEach((observer) => observer.disconnect());
    };
  }, [refs, selectors, enter, leave, options]);
}
