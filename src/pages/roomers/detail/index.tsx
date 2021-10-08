import MeetingTimePicker from '@/components/DatePicker';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Select } from 'antd';

const Tenant: React.FC = () => {
  const data = [
    {
      id: 0,
      name: '张三',
      gender: '男',
      roomer: '101',
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
      roomer: '102',
      rented: 1,
      startTime: '2021-01-02',
      endTime: '2021-07-02',
      rent: 1500,
      water: 100,
      electric: 200,
      remark: '',
    },
    {
      id: 3,
      name: '王五',
      gender: '男',
      roomer: '103',
      rented: 1,
      startTime: '2021-01-02',
      endTime: '2021-07-02',
      rent: 1500,
      water: 100,
      electric: 200,
      remark: '',
    },
    {
      id: 3,
      name: '马六',
      gender: '男',
      roomer: '104',
      rented: 1,
      startTime: '2021-01-02',
      endTime: '2021-07-02',
      rent: 1500,
      water: 100,
      electric: 200,
      remark: '',
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Form.Item label="机构名称">
            <Select></Select>
          </Form.Item>
          <Form.Item
            name="meetingTime"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <MeetingTimePicker></MeetingTimePicker>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default Tenant;
