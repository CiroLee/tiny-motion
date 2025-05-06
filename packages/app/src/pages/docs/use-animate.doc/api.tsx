import Link from '@/ui/Link';
import Tag from '@/ui/Tag';
import type { ApiTableRow } from '@/components/ApiTable';

export const returnRows: ApiTableRow[] = [
  {
    name: 'ref',
    desc: 'ref to the element to animate',
    type: 'tag: React.RefObject<T>'
  },
  {
    name: 'AnimationController',
    desc: (
      <>
        the element interface <Tag>animate()</Tag> method, it returns the created <Tag>Animation</Tag> object instance
      </>
    ),
    type: (
      <Link target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/API/Element/animate">
        AnimationController
      </Link>
    )
  }
];
