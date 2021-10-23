import { Button, Checkbox, Input,Form } from 'antd'
import axios from 'axios';
import _fetch from 'isomorphic-fetch';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  const onFinish = (values) => {
    const data={
      fullName: values.fullname,
      email: values.email,
      password: values.password,
      phone: values.phone,
      platform: "WEB",
      url_active_account: "123"
    };
    console.log(data)
    //callFetch(data);
    calllAxios(data);
   
  };
  const calllAxios=(data)=>{
    axios.post('https://api-dev.ecomos.vn:8443/gateway-service/v1/customers/register/UAUAP',data,{headers:{
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }})
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  const callFetch=(data)=>{
     
    _fetch('https://api-dev.ecomos.vn:8443/gateway-service/v1/customers/register/UAUAP',{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(data)
  })
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
      <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Họ và tên"
        name="fullname"
        rules={[{ required: true, message: 'Hãy nhập họ và tên!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="email"
        name="email"
        rules={[{ required: true, message: 'Hãy nhập email!' }]}
      >
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label="phone"
        name="phone"
        rules={[{ required: true, message: 'Hãy nhập số điện thoại!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Re Password"
        name="rePass"
        rules={[{ required: true, message: 'Please input your password again!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
