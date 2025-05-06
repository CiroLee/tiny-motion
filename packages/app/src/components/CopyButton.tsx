import { useRef, useState } from 'react';
import { copyToClipboard } from '@/utils/utils';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import Button from '@/ui/Button';
import { cn } from '@/lib/utils';

export default function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const handleCopyCode = (code: string) => {
    if (copied) return;
    copyToClipboard(code).then(() => {
      setCopied(true);
      timer.current = setTimeout(() => {
        setCopied(false);
      }, 1000);
    });
  };
  return (
    <Button size="sm" colors="neutral" variant="light" className={cn('group', className)} icon onClick={() => handleCopyCode(text)}>
      {copied ? <IconCheck className="text-white/40" size={18} /> : <IconCopy className="text-white/40 group-hover:text-white/70" size={18} />}
    </Button>
  );
}
