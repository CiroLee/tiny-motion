import { cn } from '@/lib/utils';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { EASING_FUNCTIONS, type EaseFunctionType } from '@cirolee/tiny-motion';
import { useRef, useState } from 'react';
import { cva } from 'class-variance-authority';
import Tag from '@/ui/Tag';
import HoverCard from '@/ui/HoverCard';
import SvgIcon from './SvgIcon';

const item = cva('relative cursor-pointer rounded-sm border border-line px-2 py-3 transition hover:bg-primary/10 hover:border-primary/15', {
  variants: {
    active: {
      true: 'border-primary text-primary-600'
    }
  }
});
interface PropertyListProps {
  onSetEasing: (key: string, easing: EaseFunctionType) => void;
  onSetDuration: (duration: number) => void;
  onSetDelay: (delay: number) => void;
  onSetFill: (fill: FillMode) => void;
  onSetIterations: (iterations: number) => void;
  onSetDirection: (direction: PlaybackDirection) => void;
}
export default function PropertyList({ onSetEasing, onSetDuration, onSetDelay, onSetFill, onSetIterations, onSetDirection }: PropertyListProps) {
  const [easing, setEasing] = useState<EaseFunctionType>('linear');
  const [fill, setFill] = useState<FillMode>('none');
  const [iterations, setIterations] = useState(1);
  const [direction, setDirection] = useState<PlaybackDirection>('normal');
  const durationInputRef = useRef<HTMLInputElement>(null);
  const delayInputRef = useRef<HTMLInputElement>(null);
  const iterationsInputRef = useRef<HTMLInputElement>(null);

  const handleResetAll = () => {
    handleOnSetEasing('linear', 'linear');
    handleOnSetDuration(500);
    handleOnSetDelay(0);
    handleOnSetFill('none');
    handleOnSetIterations(1);
    handleOnSetDirections('normal');

    if (durationInputRef.current && delayInputRef.current && iterationsInputRef.current) {
      durationInputRef.current.value = '';
      delayInputRef.current.value = '';
      iterationsInputRef.current.value = '';
    }
  };

  const handleOnSetEasing = (key: string, easing: EaseFunctionType) => {
    setEasing(easing);
    onSetEasing(key, easing);
  };

  const handleOnSetFill = (fill: FillMode) => {
    setFill(fill);
    onSetFill(fill);
  };

  const handleOnSetDuration = (duration: number) => {
    onSetDuration(duration);
  };

  const handleOnSetDelay = (delay: number) => {
    onSetDelay(delay);
  };

  const handleOnSetIterations = (iterations: number) => {
    setIterations(iterations);
    onSetIterations(iterations);
  };

  const handleOnSetDirections = (direction: PlaybackDirection) => {
    setDirection(direction);
    onSetDirection(direction);
  };
  return (
    <div className="bg-background relative ml-auto box-border flex h-full w-75 flex-col overflow-hidden py-3 shadow-[-2px_0_16px_4px] shadow-black/5">
      <div className="mb-2 flex justify-between px-3">
        <div className="flex items-center">
          <span>Easing</span>
          <HoverCard className="max-w-80" trigger={<IconAlertCircleFilled size="1em" className="ml-2 cursor-pointer text-orange-300" />}>
            easing width <div className="inline-block size-[8px] rounded-full bg-orange-300"></div> symbol means that the effect is achieved by <Tag colors="secondary">linear()</Tag> function, it is
            available on Chrome 113+, Safari 17.2+, Firefox 112+
          </HoverCard>
        </div>
        <span className="text-primary cursor-pointer" onClick={handleResetAll}>
          reset all
        </span>
      </div>
      <div className="border-line max-h-[52%] overflow-y-auto border-b pb-3">
        <div className="grid grid-cols-2 gap-3 pr-2 pl-3">
          {Object.entries(EASING_FUNCTIONS).map(([key, value]) => (
            <div
              key={key}
              className={cn(item({ active: easing === value, className: 'flex flex-col items-center justify-center' }))}
              onClick={() => {
                handleOnSetEasing(key, value as EaseFunctionType);
              }}>
              {value.includes('linear(') ? <div className="absolute top-2 right-2 size-[8px] rounded-full bg-orange-300"></div> : null}
              <SvgIcon className="[&_svg]:size-8" name={key as EaseFunctionType} key={key} />
              <span className="mt-2 text-[12px]">{key}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="border-line mt-3 flex gap-2 border-b px-3 pb-3">
        <div className="relative flex-1">
          <p className="mb-1">duration</p>
          <div className="mt-1 flex items-center">
            <input
              ref={durationInputRef}
              type="number"
              placeholder="500"
              onBlur={(e) => {
                handleOnSetDuration(Number(e.target.value));
              }}
              className="border-line box-border h-[40px] w-full rounded-sm border px-2 outline-none"
            />
            <span className="ml-1">ms</span>
          </div>
        </div>
        <div className="relative flex-1">
          <p className="mb-1">delay</p>
          <div className="mt-1 flex items-center">
            <input
              ref={delayInputRef}
              type="number"
              placeholder="0"
              onBlur={(e) => {
                handleOnSetDelay(Number(e.target.value));
              }}
              className="border-line box-border h-[40px] w-full rounded-sm border px-2 outline-none"
            />
            <span className="ml-1">ms</span>
          </div>
        </div>
      </div>
      <div className="border-line mt-3 border-b px-3 pb-3">
        <p className="mb-1">fill mode</p>
        <div className="mt-1 grid grid-cols-3">
          {['none', 'forwards', 'backwards', 'both', 'auto'].map((item) => (
            <li
              key={item}
              className={cn(
                'border-line flex h-10 cursor-pointer items-center justify-center border text-sm last:border-t-0 [&:nth-child(1)]:border-r-0 [&:nth-child(3)]:border-l-0 [&:nth-child(4)]:border-t-0 [&:nth-child(4)]:border-r-0',
                { 'border-primary !border': fill === item }
              )}
              onClick={() => {
                handleOnSetFill(item as FillMode);
              }}>
              {item}
            </li>
          ))}
        </div>
      </div>
      <div className="border-line mt-3 border-b px-3 pb-3">
        <p>repeat times</p>
        <div className="flex items-center">
          <input
            ref={iterationsInputRef}
            type="number"
            placeholder="1"
            onBlur={(e) => {
              handleOnSetIterations(Number(e.target.value));
            }}
            className="border-line box-border h-[40px] w-full flex-1 rounded-sm border px-2 outline-none"
          />
          <span className="px-2 text-sm text-gray-400">Or</span>
          <div
            className={cn('border-line flex h-[40px] flex-1 cursor-pointer items-center justify-center border', {
              'border-primary': iterations === Infinity
            })}
            onClick={() => handleOnSetIterations(Infinity)}>
            infinite
          </div>
        </div>
      </div>
      <div className="mt-3 px-3">
        <p className="mb-1">directions</p>
        <div className="mt-1 grid grid-cols-3">
          {['normal', 'alternate', 'alternate-reverse', 'reverse'].map((item) => (
            <li
              key={item}
              className={cn(
                'border-line flex h-[40px] cursor-pointer items-center justify-center border text-center text-sm leading-[1em] whitespace-pre-wrap last:border-t-0 [&:nth-child(2)]:border-l-0 [&:nth-child(3)]:border-l-0 [&:nth-child(4)]:border-t-0',
                { 'border-primary !border': direction === item }
              )}
              onClick={() => {
                handleOnSetDirections(item as PlaybackDirection);
              }}>
              {item.replace('-', '\n')}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
