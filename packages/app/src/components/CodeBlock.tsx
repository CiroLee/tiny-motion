import { useState, useRef } from 'react';
import Code from './Code';
import CopyButton from './CopyButton';
import Button from '@/ui/Button';
import { cn } from '@/lib/utils';
interface CodeBlockProps {
  code: string;
  lang?: string;
  className?: string;
  highlightLines?: number[];
  highlightRange?: number[][];
  diffAddLines?: number[];
  diffRemoveLines?: number[];
}
export default function CodeBlock(props: CodeBlockProps) {
  const { code, lang, highlightLines, highlightRange, diffAddLines, diffRemoveLines, className } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);

  const handleOnCodeRendered = () => {
    if (ref.current) {
      const { height } = ref.current.getBoundingClientRect();
      setShowExpandButton(height > 220);
    }
  };
  return (
    <div className={cn('relative max-h-55 w-full overflow-hidden rounded-md', { 'max-h-[unset]': expanded }, className)}>
      <Code
        ref={ref}
        code={code}
        lang={lang}
        rendered={handleOnCodeRendered}
        highlightLines={highlightLines}
        highlightRange={highlightRange}
        diffAddLines={diffAddLines}
        diffRemoveLines={diffRemoveLines}
        className="overflow-hidden text-sm [&_pre]:w-full [&_pre]:overflow-auto [&_pre]:p-3 [&_pre_code]:block [&_pre_code]:min-w-fit"
      />
      <CopyButton text={code} className="absolute top-2 right-2" />

      {showExpandButton ? (
        <div className="absolute bottom-0 flex h-20 w-full items-center justify-center bg-gradient-to-t from-black/20 to-transparent">
          <Button size="sm" className="" onClick={() => setExpanded(!expanded)}>
            {expanded ? 'collapse' : 'expand'}
          </Button>
        </div>
      ) : null}
    </div>
  );
}
