import CopyButton from '@/components/CopyButton';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import { useAnimate } from '@cirolee/tiny-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
  const [ref, animate] = useAnimate<HTMLDivElement>();
  useEffect(() => {
    animate(
      {
        offsetDistance: ['0%', '100%']
      },
      {
        duration: 10000,
        iterations: Infinity
      }
    );
  }, []);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Heading as="h1">tiny-motion</Heading>
      <p className="mt-4 px-4 text-center sm:px-0">The high-performance extension of Web Animation API for React Hooks</p>
      <div className="relative mt-12 box-border h-11 overflow-hidden rounded-lg bg-neutral-700 p-0.5 shadow-[0_2px_20px_2px] shadow-[rgba(53,23,1,0.3)]">
        <div className="relative z-10 flex size-full items-center rounded-md bg-neutral-800 pr-1.5 pl-4 text-white">
          <span className="pr-3">npm install @cirolee/tiny-motion</span>
          <CopyButton text="npm install @cirolee/tiny-motion" className="ml-2" />
        </div>
        <div ref={ref} className="streamer offset-rect absolute -top-1/2 z-[1] size-[50px] rounded-full blur-sm"></div>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2 md:gap-4">
        <Button colors="secondary" asChild>
          <Link to="/docs">View Document</Link>
        </Button>
        <Button colors="secondary" asChild>
          <Link to="/presets">View Presets</Link>
        </Button>
      </div>
    </div>
  );
}
