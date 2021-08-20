import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { history } from 'umi';

const Tenant: React.FC = () => {
  const data = [
    {
      id: 0,
      name: '张三',
      gender: '男',
      roomer: '201',
      rented: 1,
      startTime: '2021-01-02',
      endTime: '2022-01-02',
      rent: 1500,
      water: 100,
      electric: 200,
      remark: '上月水电未交',
    },
    {
      id: 1,
      name: '李四',
      gender: '男',
      roomer: '202',
      rented: 1,
      startTime: '2021-01-02',
      endTime: '2021-07-02',
      rent: 1500,
      water: 100,
      electric: 200,
      remark: '',
    },
  ];

  const columns: ColumnsType<any> = [
    {
      title: '房间号',
      dataIndex: 'roomer',
      width: 100,
    },
    {
      title: '是否已出租',
      dataIndex: 'rented',
      width: 100,
      render: (text) => {
        return text === 1 ? (
          <Badge status="success" text="已租" />
        ) : (
          <Badge status="default" text="未租" />
        );
      },
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 100,
    },
    {
      title: '性别',
      dataIndex: 'gender',
      width: 100,
    },

    {
      title: '出租开始日期',
      dataIndex: 'startTime',
      width: 100,
    },
    {
      title: '出租开始日期',
      dataIndex: 'endTime',
      width: 100,
    },
    {
      title: '租金',
      dataIndex: 'rent',
      width: 100,
    },
    {
      title: '水费',
      dataIndex: 'water',
      width: 100,
    },
    {
      title: '电费',
      dataIndex: 'electric',
      width: 100,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'actions',
      width: 100,
      render: () => {
        return (
          <a
            onClick={() => {
              history.push('/roomers/detail/1');
            }}
          >
            编辑
          </a>
        );
      },
    },
  ];

  return (
    <PageContainer>
      <Table dataSource={data} columns={columns}></Table>
    </PageContainer>
  );
};

export default Tenant;
