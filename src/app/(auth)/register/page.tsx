import { Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react';
import RegisterBody from './components/RegisterBody';

export default function login() {
  return (
    <Card className='max-w-[500px] min-w-[200px]'>
      <CardHeader>
        <h2>Register</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <RegisterBody />
      </CardBody>
    </Card>
  );
}
