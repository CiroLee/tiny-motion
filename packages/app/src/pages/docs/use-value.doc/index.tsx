import PageNavigate from '@/components/PageNavigate';
import Playground from '@/components/Playground';
import Heading from '@/ui/Heading';
import Button from '@/ui/Button';
import { useValue } from '@cirolee/tiny-motion';
import CodeBlock from '@/components/CodeBlock';
import { code, delayCode, typesCode } from './codes';
import ApiTable from '@/components/ApiTable';
import { propsRows } from './api';
import Tag from '@/ui/Tag';
import { Link } from 'react-router-dom';
export default function UseValueDoc() {
  const [value, controller] = useValue(0, 100, {
    duration: 5000,
    autoPlay: false,
    easing: 'easeOutCubic'
  });
  const [value2, controller2] = useValue(0, 100, {
    duration: 5000,
    autoPlay: false,
    easing: 'easeOutCubic',
    delay: 1000
  });
  return (
    <div>
      <Heading as="h2" className="mb-2">
        useValue
      </Heading>
      <p className="text-description mb-2">useValue is used to animate any number you want.</p>
      <Playground className="mb-4 flex h-65 flex-col items-center">
        <div className="border-line bg-background my-4 flex size-30 items-center justify-center rounded-xl border text-3xl font-bold">{value}</div>
        <p>isPlaying: {controller.isPlaying.toString()}</p>
        <div className="mt-4 space-x-2">
          <Button size="sm" disabled={controller.isPlaying} onClick={() => controller.play()}>
            play
          </Button>
          <Button size="sm" onClick={() => controller.pause()}>
            pause
          </Button>
          <Button size="sm" onClick={() => controller.resume()}>
            resume
          </Button>
          <Button size="sm" onClick={() => controller.cancel()}>
            cancel
          </Button>
        </div>
      </Playground>
      <CodeBlock code={code} highlightRange={[[4, 8]]} />
      <p className="mt-6 mb-2">
        use <Tag colors="neutral">delay</Tag> to delay the animation.
      </p>
      <Playground className="my-4 flex h-65 flex-col items-center">
        <div className="bg-background border-line my-4 flex size-30 items-center justify-center rounded-xl border text-3xl font-bold">{value2}</div>
        <Button disabled={controller2.isPlaying} size="sm" onClick={() => controller2.play()}>
          play(delay=1000ms)
        </Button>
      </Playground>
      <CodeBlock code={delayCode} diffAddLines={[7]} highlightRange={[[4, 8]]} />
      <Heading as="h4" className="my-4">
        Signature
      </Heading>
      <CodeBlock code="function useValue(from: number, to: number, options: ValueOptions = {}): [number, ValueController]" />
      <Heading as="h4" className="my-4">
        Types
      </Heading>
      <CodeBlock code={typesCode} />
      <Heading as="h4" className="my-4">
        Props
      </Heading>
      <ApiTable rows={propsRows} styles={{ default: { width: '260px' } }} />
      <Heading as="h4" className="my-4">
        ReturnType
      </Heading>
      <div>
        <Tag className="mb-2" colors="neutral">
          ValueController
        </Tag>{' '}
        see{' '}
        <Link className="text-primary underline" to="/docs/overview">
          here
        </Link>
      </div>
      <div className="my-12 flex justify-between">
        <PageNavigate direction="prev" path="/docs/use-line-draw">
          useLineDraw
        </PageNavigate>
        <PageNavigate direction="next" path="/docs/use-spring">
          useSpring
        </PageNavigate>
      </div>
    </div>
  );
}
