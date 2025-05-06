import Heading from '@/ui/Heading';
import CodeBlock from '@/components/CodeBlock';
import PageNavigate from '@/components/PageNavigate';
import { animationControllerCode } from '../common.api';
export default function Overview() {
  return (
    <div>
      <Heading as="h2" className="mb-4">
        Overview
      </Heading>
      <p className="text-description">tiny-motion is a high-performance extension of Web Animation API(WAAPI) for react hooks. It's easy to get started. More controls over animations.</p>
      <Heading as="h4" className="my-4">
        Install
      </Heading>
      <CodeBlock className="sm:w-[60%]" lang="bash" code="npm install @cirolee/tiny-motion" />
      <Heading as="h4" className="my-4">
        Types
      </Heading>
      <CodeBlock code={animationControllerCode} />
      <div className="my-12 flex justify-end">
        <PageNavigate direction="next" path="/docs/use-animate">
          useAnimate
        </PageNavigate>
      </div>
    </div>
  );
}
