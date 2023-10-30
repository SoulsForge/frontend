'use client';
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import Case from '~/common/components/conditionals/Case';
import Default from '~/common/components/conditionals/Default';
import Switch from '~/common/components/conditionals/Switch';
import useAuth from '~/hooks/useAuth';

export default function Nav() {
  const { isLogged, logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout().then(() => {
      router.push('/');
    });
  }

  const links: Map<string, { name: string; to: string }> = new Map([
    ['home', { name: 'Home', to: '/' }],
    ['register', { name: 'Register', to: '' }],
    ['login', { name: 'Login', to: '' }],
    ['profile', { name: 'Profile', to: '' }],
    ['character-create', { name: 'Create', to: '/create' }],
    ['logout', { name: 'Logout', to: '' }]
  ]);
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <Link href='/' className='font-bold text-inherit'>
          SoulsForge
        </Link>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                endContent={<BiChevronDown />}
                radius='none'
                variant='light'
              >
                Characters
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label='Characters' className='rounded-none'>
            <DropdownItem key='eldenring' textValue='elden ring dropdown'>
              <Link href='/characters/elden-ring' className='w-full'>
                Elden Ring
              </Link>
            </DropdownItem>
            <DropdownItem key='bloodborne' textValue='bloodborne dropdown'>
              <Link href='/characters/elden-ring' isDisabled className='w-full'>
                BloodBorne
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent justify='end'>
        <Switch>
          <Case condition={Boolean(isLogged())}>
            <NavbarItem>
              <Link color='foreground' href={links.get('character-create')?.to}>
                {links.get('character-create')?.name}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link href='/profile'>Profile</Link>
            </NavbarItem>
            <NavbarItem>
              <Button onClick={handleLogout} color='warning' variant='flat'>
                Log Out
              </Button>
            </NavbarItem>
          </Case>
          <Default>
            <NavbarItem>
              <Link href='/login'>Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color='primary' href='/register' variant='flat'>
                Sign Up
              </Button>
            </NavbarItem>
          </Default>
        </Switch>
      </NavbarContent>
    </Navbar>
  );
}
