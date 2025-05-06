import { useState } from 'react';
import Playground from '@/components/Playground';
import Button from '@/ui/Button';
import Heading from '@/ui/Heading';
import Slider from '@/ui/Slider';
import CodeBlock from '@/components/CodeBlock';
import { code1, typeCode } from './codes';
import { useSpring } from '@cirolee/tiny-motion';
import Tag from '@/ui/Tag';
import { Link } from 'react-router-dom';
import ApiTable from '@/components/ApiTable';
import { propsRow } from './api';
import PageNavigate from '@/components/PageNavigate';

export default function UseSpringDoc() {
  const [springConf, setSpringConf] = useState({ mass: 1, stiffness: 100, damping: 10, velocity: 0 });
  const [y, controller] = useSpring(0, 240, { ...springConf, autoPlay: false });
  const reset = () => {
    controller.cancel();
    setSpringConf({
      mass: 1,
      stiffness: 100,
      damping: 10,
      velocity: 0
    });
  };
  return (
    <div>
      <Heading as="h2" className="mb-4">
        useSpring
      </Heading>
      <p className="mb-2">useSpring is used to simulate the real physical spring motion effect. Note: the function doesn't include time parameter, it's calculated by the function itself</p>
      <Playground className="relative mb-4 h-110 px-8">
        <div className="bg-primary relative top-3 ml-[33%] size-16 rounded-full" style={{ transform: `translateY(${y}px)` }}></div>
        <div className="border-box bg-background absolute top-1/2 right-2 flex h-[94%] w-60 -translate-y-1/2 flex-col justify-between space-y-3 rounded p-2 shadow-[-1px_0_10px_2px] shadow-neutral-200 dark:shadow-neutral-800">
          <div className="space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>mass:</span>
                <span>{springConf.mass}</span>
              </div>
              <Slider defaultValue={[springConf.mass]} min={1} max={5} value={[springConf.mass]} onValueChange={(value) => setSpringConf({ ...springConf, mass: value[0] })} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>stiffness:</span>
                <span>{springConf.stiffness}</span>
              </div>
              <Slider defaultValue={[springConf.stiffness]} min={1} max={1000} value={[springConf.stiffness]} onValueChange={(value) => setSpringConf({ ...springConf, stiffness: value[0] })} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>damping:</span>
                <span>{springConf.damping}</span>
              </div>
              <Slider defaultValue={[springConf.damping]} min={1} max={100} value={[springConf.damping]} onValueChange={(value) => setSpringConf({ ...springConf, damping: value[0] })} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>velocity:</span>
                <span>{springConf.velocity}</span>
              </div>
              <Slider defaultValue={[springConf.velocity]} min={0} max={30} value={[springConf.velocity]} onValueChange={(value) => setSpringConf({ ...springConf, velocity: value[0] })} />
            </div>
            <p className="text-primary cursor-pointer text-end underline" onClick={reset}>
              reset
            </p>
          </div>

          <Button className="w-full" disabled={controller.isPlaying} onClick={controller.play}>
            {controller.isPlaying ? 'playing...' : 'start'}
          </Button>
        </div>
      </Playground>
      <CodeBlock code={code1} />
      <Heading as="h4" className="my-4">
        Signature
      </Heading>
      <CodeBlock code="function useSpring(from: number, to: number, options?: SpringOptions): [number, ValueController]" />
      <Heading as="h4" className="my-4">
        Types
      </Heading>
      <CodeBlock code={typeCode} />
      <Heading as="h4" className="my-4">
        Props
      </Heading>
      <ApiTable rows={propsRow} styles={{ default: { width: '260px' } }} />
      <Heading as="h4" className="my-4">
        ReturnType
      </Heading>
      <div>
        <Tag className="mb-2" colors="neutral">
          ValueController
        </Tag>{' '}
        see{' '}
        <Link className="text-secondary underline" to="/docs/overview">
          here
        </Link>
      </div>
      <div className="my-12 flex justify-between">
        <PageNavigate direction="prev" path="/docs/use-value">
          useValue
        </PageNavigate>
        <PageNavigate direction="next" path="/docs/animate">
          animate
        </PageNavigate>
      </div>
    </div>
  );
}
