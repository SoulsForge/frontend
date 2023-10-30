import { Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react';
import LoginBody from './components/LoginBody';

export default function login() {
  return (
    <Card className='max-w-[500px] min-w-[200px]'>
      <CardHeader>
        <h2>Login</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <LoginBody />
      </CardBody>
    </Card>
  );
}
