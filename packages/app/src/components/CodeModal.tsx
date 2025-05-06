import { useState, useEffect, useRef } from 'react';
import { IconXboxXFilled } from '@tabler/icons-react';
import { type AnimationOptions, useMultiple } from '@cirolee/tiny-motion';
import { cn } from '@/lib/utils';
import Code from './Code';
import CopyButton from './CopyButton';

interface CodeDrawerProps {
  show?: boolean;
  code: string;
  lang?: string;
  className?: string;
  onClose: () => void;
}
const options: AnimationOptions = {
  duration: 200,
  fill: 'both'
};
const CodeDrawer = (props: CodeDrawerProps) => {
  const { show, code, lang, className, onClose } = props;

  const [visible, setVisible] = useState(false);
  const maskRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);

  const controller = useMultiple(
    {
      baseOptions: options,
      config: [
        {
          ref: maskRef,
          keyframes: {
            opacity: [0, 1]
          }
        },
        {
          ref: codeRef,
          keyframes: {
            opacity: [0, 1],
            transform: ['scale(0.92)', 'scale(1)']
          }
        }
      ],
      onComplete: (trigger) => {
        if (trigger === 'reverse') {
          setVisible(false);
          onClose?.();
        }
      }
    },
    [visible]
  );

  const handleOnClose = () => {
    controller.reverse();
  };

  useEffect(() => {
    setVisible(!!show);
    if (visible) {
      controller.play();
    }
  }, [show, visible]);
  return (
    <>
      {visible ? (
        <div className={cn('fixed inset-0 z-(--popup) flex size-full items-center justify-center', className)}>
          <div ref={maskRef} className="absolute inset-0 bg-black/10 backdrop-blur-sm" onClick={handleOnClose}></div>
          <div ref={codeRef} className="border-line bg-background relative flex min-h-55 flex-col items-center rounded-md border px-4 py-5">
            <IconXboxXFilled size={26} className="absolute -top-2.5 -right-2.5 cursor-pointer dark:text-neutral-500" onClick={handleOnClose} />
            <div className="relative mb-2 w-full overflow-hidden rounded-md">
              <CopyButton text={`import { EASING_FUNCTIONS } from '@cirolee/tiny-motion';`} className="absolute top-1/2 right-2 -translate-y-1/2" />
              <Code className="mt-1 size-full text-sm [&_pre]:min-w-fit [&_pre]:rounded-md [&_pre]:p-3" code={`import { EASING_FUNCTIONS } from '@cirolee/tiny-motion';`} lang={lang} />
            </div>
            <div className={cn('scrollbar relative min-w-[540px] overflow-auto rounded-md')}>
              <CopyButton text={code} className="absolute top-2 right-2" />
              <Code className="mt-1 size-full text-sm [&_pre]:min-w-fit [&_pre]:rounded-md [&_pre]:p-3" code={code} lang={lang} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default CodeDrawer;
