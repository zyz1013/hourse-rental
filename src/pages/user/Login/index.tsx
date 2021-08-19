import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-form';
import { Alert, message } from 'antd';
import React, { useState } from 'react';
import { history, useModel } from 'umi';
import styles from './index.less';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async () => {
    // const userInfo = await initialState?.fetchUserInfo?.();
    const userInfo = {
      name: '张三',
      phone: '1502312131',
    };
    if (userInfo) {
      setInitialState({
        ...initialState,
        currentUser: userInfo,
      });
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      // const msg = await login({ ...values, type });
      const msg = {
        status: 'ok',
      };
      if (msg.status === 'ok') {
        message.success('登录成功！');
        await fetchUserInfo();
        goto();
        return;
      }
      // 如果失败去设置用户错误信息
      setUserLoginState(msg);
    } catch (error) {
      message.error('登录失败，请重试！');
    }
    setSubmitting(false);
  };
  const { status } = userLoginState;

  return (
    <div className={styles.container}>
      <LoginForm
        className={styles.loginform}
        title="DEMO"
        onFinish={async (values) => {
          handleSubmit(values as API.LoginParams);
        }}
      >
        {status === 'error' && <LoginMessage content={'账户或密码错误'} />}
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: <UserOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'用户名'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined className={styles.prefixIcon} />,
          }}
          placeholder={'密码'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
      </LoginForm>
    </div>
  );
};

export default Login;
