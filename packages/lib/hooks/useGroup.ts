/**
 * @description advanced use. manage a group of elements using the same animation parameters
 */
import { useRef, useEffect, useCallback } from 'react';
import * as controller from './controller';
import { getType } from './utils';
import type { AnimateController, DOMElement, SpecialAnimationOptions } from './types';

interface useGroupProps<T extends DOMElement> {
  refs: React.MutableRefObject<T | null>[];
  keyframes: Keyframe[] | PropertyIndexedKeyframes;
  options?: SpecialAnimationOptions;
  onComplete?: (trigger?: 'play' | 'reverse') => void;
  onStart?: () => void;
  onPause?: () => void;
  onCancel?: () => void;
  onResume?: () => void;
}

function combineOptions<T extends DOMElement>(options: SpecialAnimationOptions, el: T, index: number, length: number) {
  if (typeof options === 'number') {
    return options;
  }
  if (getType(options) === 'object') {
    return {
      ...options,
      delay: typeof options.delay === 'number' ? options.delay : options.delay?.(el, index, length),
      endDelay: typeof options.endDelay === 'number' ? options.endDelay : options.endDelay?.(el, index, length)
    };
  }
}

export function useGroup<T extends DOMElement>(props: useGroupProps<T>, deps: any[]): AnimateController {
  const { refs, keyframes, options = 0, onComplete, onStart, onPause, onCancel, onResume } = props;
  const animations = useRef<(Animation | undefined)[]>([]);

  useEffect(() => {
    animations.current = refs.map((ref, index, arr) => {
      const animation = ref.current!.animate(keyframes, combineOptions(options, ref.current!, index, arr.length));
      animation.cancel();
      return animation;
    });

    return () => clear();
  }, deps);

  const clear = () => {
    refs.forEach((ref) => {
      ref.current?.getAnimations().forEach((animation) => animation.cancel());
    });
  };

  const play = useCallback(() => {
    clear();
    onStart?.();
    controller.play(animations.current, onComplete);
  }, [onStart]);

  const pause = useCallback(() => {
    onPause?.();
    controller.pause(animations.current);
  }, []);

  const cancel = useCallback(() => {
    onCancel?.();
    controller.cancel(animations.current);
  }, [onCancel]);

  const reverse = useCallback(() => {
    controller.reverse(animations.current, onComplete);
  }, []);

  const resume = useCallback(() => {
    onResume?.();
    controller.resume(animations.current);
  }, [onResume]);

  return { play, pause, cancel, reverse, resume };
}
