import { Breadcrumb } from 'antd';
import type { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import React from 'react';
import { ObjectUtils } from 'ts-type-utils';
import { Link } from 'umi';
import styles from './styles.less';

interface PageContainerProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  showBreadcrumb?: boolean;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  footerStyle?: React.CSSProperties;
  currentBreadcrumbName?: string;
}

const PageContainer: React.FC<PageContainerProps> = (props) => {
  const {
    showBreadcrumb = true,
    currentBreadcrumbName,
    header,
    footer,
    style,
    bodyStyle,
    footerStyle,
  } = props;
  const breadcrumbRoutersStr = ObjectUtils.getOrDefault(
    localStorage.getItem('breadcrumbRouters'),
    JSON.stringify([]),
  );
  const breadcrumbRouters = JSON.parse(breadcrumbRoutersStr);

  return (
    <div className={styles.wrapper} style={style}>
      {showBreadcrumb ? (
        <div className={styles.breadcrumb}>
          <Breadcrumb separator=">">
            {breadcrumbRouters.map((item: Route, index: number) => {
              return (
                <Breadcrumb.Item key={index}>
                  {index === breadcrumbRouters.length - 1 ? (
                    ObjectUtils.getOrDefault(currentBreadcrumbName, item.breadcrumbName)
                  ) : (
                    <Link to={item.path}>{item.breadcrumbName}</Link>
                  )}
                </Breadcrumb.Item>
              );
            })}
          </Breadcrumb>
        </div>
      ) : null}
      {ObjectUtils.hasValue(header) ? <div className={styles.header}>{header}</div> : null}
      <div className={styles.body} style={bodyStyle}>
        {props.children}
      </div>
      {ObjectUtils.hasValue(footer) ? (
        <div className={styles.footer} style={footerStyle}>
          {footer}
        </div>
      ) : null}
    </div>
  );
};

export default PageContainer;
