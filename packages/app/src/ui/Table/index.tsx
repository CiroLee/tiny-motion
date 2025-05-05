import { cn } from '@/utils/utils';
export interface TableBaseType<T> {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  ref?: React.Ref<T>;
  [key: string]: unknown;
}

export interface TableProps extends TableBaseType<HTMLTableElement> {
  border?: boolean;
  headerFixed?: boolean;
}

const Table = ({ className, style, headerFixed, border, children, ref }: TableProps) => {
  return (
    <div
      className={cn(
        'box-border overflow-x-auto rounded-[6px]',
        {
          'border border-gray-200/80 [&_tr:last-child]:border-0': border,
          'overflow-y-auto [&_thead]:sticky [&_thead]:top-0': headerFixed
        },
        className
      )}
      style={style}>
      <table ref={ref} className={cn('w-full table-auto border-collapse border-spacing-0')}>
        {children}
      </table>
    </div>
  );
};

const TableHeader = ({ className, children, ref }: TableBaseType<HTMLTableSectionElement>) => {
  return (
    <thead ref={ref} className={cn('w-full border-b-[1px] border-gray-200/80 bg-gray-100 text-sm', className)}>
      <TableRow>{children}</TableRow>
    </thead>
  );
};

const TableBody = ({ className, children, ref }: TableBaseType<HTMLTableSectionElement>) => {
  return (
    <tbody ref={ref} className={cn(className)}>
      {children}
    </tbody>
  );
};

const TableHeaderCell = ({ className, children, ref, ...rest }: TableBaseType<HTMLTableCellElement>) => {
  return (
    <th
      ref={ref}
      className={cn(
        `relative p-[14px] text-start font-semibold after:absolute after:right-0 after:top-[50%] after:mr-1 after:h-[40%] after:w-px after:translate-y-[-50%] after:bg-gray-200 after:content-[''] last:after:content-[unset]`,
        className
      )}
      {...rest}>
      {children}
    </th>
  );
};

const TableRow = ({ className, children, ref }: TableBaseType<HTMLTableRowElement>) => {
  return (
    <tr ref={ref} className={cn('border-b-[1px] border-gray-200/80 transition-colors hover:bg-gray-200/30', className)}>
      {children}
    </tr>
  );
};

const TableDataCell = ({ className, children, ref }: TableBaseType<HTMLTableCellElement>) => {
  return (
    <td ref={ref} className={cn('p-[14px] text-[14px]', className)}>
      {children}
    </td>
  );
};

export { Table, TableHeader, TableHeaderCell, TableBody, TableRow, TableDataCell };
