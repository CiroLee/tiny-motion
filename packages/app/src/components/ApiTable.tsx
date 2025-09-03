import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@/ui/Table';
import Link from '@/ui/Link';
import Divider from '@/ui/Divider';
import Tag from '@/ui/Tag';

export interface ApiTableRow {
  name: React.ReactNode;
  desc?: React.ReactNode;
  type: React.ReactNode;
  required?: boolean | string;
  default?: boolean | string | number;
}
export interface ApiTableProps {
  rows: ApiTableRow[];
  omitHeads?: string[];
  styles?: {
    name?: React.CSSProperties;
    description?: React.CSSProperties;
    type?: React.CSSProperties;
    required?: React.CSSProperties;
    default?: React.CSSProperties;
  };
}
const header = ['Name', 'Type', 'Description', 'Required', 'Default'];
function renderType(type: React.ReactNode) {
  if (typeof type !== 'string') {
    return type;
  }
  if (type.startsWith('tag')) {
    const tags = type.replace(/^tag:/, '').split('|');
    return (
      <div className="flex flex-wrap gap-y-2">
        {tags.map((item, index) => (
          <div className="relative inline-flex items-center" key={index}>
            <Tag colors="secondary">{item}</Tag>
            {index !== tags.length - 1 && <Divider orientation="vertical" className="mx-3" />}
          </div>
        ))}
      </div>
    );
  } else if (type.startsWith('link')) {
    const pattern = /link: (\w+)\((https?:\/\/\S+)\)/;
    const match = type.match(pattern);
    if (match) {
      return (
        <Link target="_blank" href={match[2]}>
          {match[1]}
        </Link>
      );
    }
  }
  return type;
}
export default function ApiTable({ rows, omitHeads = [], styles = { name: {}, default: {}, description: {}, required: {} } }: ApiTableProps) {
  const _header = header.filter((item) => !omitHeads.includes(item));
  return (
    <Table fixedHeader className="max-h-[unset]">
      <TableHeader className="z-2">
        <TableRow>
          {_header.map((item) => (
            <TableHeaderCell key={item} style={styles[item.toLowerCase() as keyof ApiTableProps['styles']]}>
              {item}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((item, index) => (
          <TableRow key={index}>
            {item.name !== undefined ? <TableCell>{item.name}</TableCell> : null}
            {item.type !== undefined ? <TableCell className="text-secondary">{renderType(item.type)}</TableCell> : null}
            {item.desc !== undefined ? <TableCell>{item.desc}</TableCell> : null}
            {item.required !== undefined ? <TableCell>{item.required.toString()}</TableCell> : null}
            {item.default !== undefined ? <TableCell>{item.default?.toString()}</TableCell> : null}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
