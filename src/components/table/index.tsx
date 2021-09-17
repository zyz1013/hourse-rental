/* eslint-disable no-nested-ternary */
import type { TableProps as AntdTableProps } from 'antd';
import { Table as AntdTable } from 'antd';
import { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import styles from './styles.less';

export interface TableProps<RecordType> extends AntdTableProps<RecordType> {
  /**
   * 容器样式  默认height:'100%'
   */
  wrapperClassName?: string;
  /**
   *  title or footer or summary height
   *  默认table的scroll的y计算=容器的height-table表头-table分页
   *  如果使用了table的title、footer、summary属性 需要填写otherheight,否则y计算结果会偏大
   */
  otherHeight?: number;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function Table<RecordType extends object = any>(props: TableProps<RecordType>) {
  const {
    wrapperClassName,
    scroll,
    otherHeight = 0,
    pagination,
    size = 'small',
    ...restProps
  } = props;
  const classNames = [styles.wrapper];
  if (wrapperClassName) {
    classNames.push(wrapperClassName);
  }
  const [stateHeight, setHeight] = useState<number>(300);
  const { height, ref } = useResizeDetector({ handleWidth: false });

  useEffect(() => {
    if (height) {
      const headerHeight = size === 'small' ? 39 : size === 'middle' ? 47 : 77;
      const paginationHeight = pagination === false ? 0 : pagination?.size === 'small' ? 56 : 64;

      setHeight(height - headerHeight - paginationHeight - otherHeight);
    }
  }, [height, otherHeight]);

  return (
    <div className={classNames.join(' ')} ref={ref}>
      <AntdTable<RecordType> size={size} scroll={{ y: stateHeight, ...scroll }} {...restProps} />
    </div>
  );
}

export default Table;
