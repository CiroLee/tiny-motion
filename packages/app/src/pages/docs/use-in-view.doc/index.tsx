import { useRef } from 'react';
import Heading from '@/ui/Heading';
import Playground from '@/components/Playground';
import { useInView, animate, useGroup, EASING_FUNCTIONS } from '@cirolee/tiny-motion';
import PageNavigate from '@/components/PageNavigate';
import CodeBlock from '@/components/CodeBlock';
import { code1, code2 } from './codes';
import ApiTable from '@/components/ApiTable';
import { rows, options } from './api';
import Link from '@/ui/Link';

export default function UseInViewDoc() {
  const pg1Ref = useRef<HTMLDivElement>(null);
  const pg2Ref = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const controller = useGroup(
    {
      selectors: ['.ball'],
      keyframes: {
        transform: ['translateY(-100%)']
      },
      options: {
        fill: 'both',
        duration: 500,
        easing: EASING_FUNCTIONS.easeInOutBack,
        delay: (_, index) => 50 + index * 100
      }
    },
    []
  );
  useInView({
    selectors: ['.fruit'],
    options: {
      root: pg1Ref.current,
      threshold: 0.5
    },
    enter: (target) => {
      const textEl = target.querySelector('p');
      textEl &&
        animate({
          target: textEl,
          motion: 'fadeInLeft',
          options: {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease'
          }
        });
    },
    leave: (target) => {
      const textEl = target.querySelector('p');
      textEl &&
        animate({
          target: textEl,
          motion: 'fadeOutLeft',
          options: {
            duration: 1000,
            fill: 'forwards',
            easing: 'ease'
          }
        });
    }
  });

  useInView({
    refs: [targetRef],
    options: {
      root: pg2Ref.current
    },
    enter: () => {
      controller.play();
    }
  });
  return (
    <>
      <Heading as="h2" className="mb-4">
        useInView
      </Heading>
      <p className="text-description mb-4">useInView is used to animate elements when target enters or leaves the viewport</p>
      <Playground ref={pg1Ref} className="mb-4 h-44 overflow-y-auto">
        <div className="fruit flex h-full items-center bg-green-300 pl-3">
          <p className="text-4xl font-bold text-black">🍎Apple</p>
        </div>
        <div className="fruit flex h-full items-center bg-orange-300">
          <p className="pl-3 text-4xl font-bold text-black">🍊orange</p>
        </div>
        <div className="fruit flex h-full items-center bg-purple-300">
          <p className="pl-3 text-4xl font-bold text-black">🍇Wine</p>
        </div>
      </Playground>
      <CodeBlock code={code1} className="mb-4" />
      <p className="mt-6 mb-2">you can also use width other hook to animate multiple elements</p>
      <Playground ref={pg2Ref} className="mb-4 h-44 overflow-y-auto">
        <div className="flex h-60 items-center justify-center bg-pink-200 text-2xl text-black">control other elements</div>
        <div ref={targetRef} className="flex h-60 w-full items-center justify-center gap-2">
          <div className="ball size-12 rounded-full bg-blue-500"></div>
          <div className="ball size-12 rounded-full bg-blue-500"></div>
          <div className="ball size-12 rounded-full bg-blue-500"></div>
        </div>
      </Playground>
      <CodeBlock code={code2} className="mb-4" />
      <Heading as="h4" className="mb-2">
        Signature
      </Heading>
      <CodeBlock code="function useInView<T extends DOMElement>(props: UseInViewProps<T>):void" className="mb-4" />
      <Heading as="h4" className="mb-2">
        Props
      </Heading>
      <ApiTable rows={rows} />
      <div className="my-4">
        <Heading as="h4">InViewOptions</Heading>
        <Link target="_blank" underline className="text-sm" href="https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/root">
          more about IntersectionObserver options
        </Link>
      </div>
      <ApiTable rows={options} />
      <div className="my-12 flex justify-between">
        <PageNavigate direction="prev" path="/docs/use-multiple">
          useMultiple
        </PageNavigate>
        <PageNavigate direction="next" path="/docs/use-line-draw">
          useLineDraw
        </PageNavigate>
      </div>
    </>
  );
}
