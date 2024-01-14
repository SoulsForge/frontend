import {
  NavbarBrand, Navbar as NavbarContainer, NavbarContent,
  NavbarItem,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Avatar, Dropdown, Link
} from '@nextui-org/react';
import Image from 'next/image';
import Switch from '@/lib/components/conditionals/switch';
import Case from '@/lib/components/conditionals/case';
import { ChevronDown } from 'lucide-react';
import Default from '@/lib/components/conditionals/default';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import useAuth from '@/lib/hooks/useAuth';
import { useRouter } from 'next/router';

const returnUrl: string[] = ['/', '/auth/register'];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLogged, logout, user } = useAuth();

  return (
    <NavbarContainer isBordered>
      <NavbarBrand>
        <Link href='/'>
          <Image src={'/favicon.ico'} alt='Logo' width={50} height={20}/>
        </Link>
        <Link href='/' className='font-bold text-inherit'>
          SoulsForge
        </Link>
      </NavbarBrand>
      <NavbarContent justify='end'>
        <Switch>
          <Case condition={Boolean(isLogged())}>
            <NavbarContent as='div' justify='end'>
              <Dropdown>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className='p-0 bg-transparent data-[hover=true]:bg-transparent'
                      radius='sm'
                      variant='light'
                      endContent={<ChevronDown size='24' className=''/>}
                    >
                      Create
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label='create'
                  className='w-[200px]'
                  itemClasses={{
                    base: 'gap-4',
                  }}
                >
                  <DropdownItem key='elden-ring'>Elden Ring</DropdownItem>
                  <DropdownItem key='bloodborne' isDisabled>
                    BloodBorne
                  </DropdownItem>
                  <DropdownItem key='dark-souls-1-2' isDisabled>
                    Dark Souls 1/2
                  </DropdownItem>
                  <DropdownItem key='dark-souls-3' isDisabled>
                    Dark Souls 3
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Dropdown placement='bottom-end'>
                <NavbarItem>
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as='button'
                      className='transition-transform'
                      color='secondary'
                      name='Jason Hughes'
                      size='sm'
                      src={user?.imageUrl}
                    />
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu aria-label='Profile Actions' variant='flat'>
                  <DropdownItem
                    // onClick={() => {
                    //   router.push(`/profile/${user?.username}`);
                    // }}
                    key='profile'
                  >
                    My Profile
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => {
                      router.push(`/settings`);
                    }}
                    key='settings'
                    showDivider
                  >
                    Settings
                  </DropdownItem>
                  <DropdownItem
                    onClick={logout}
                    key='logout'
                    color='danger'
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          </Case>
          <Default>
            <NavbarItem>
              {
                returnUrl.findIndex(x => x === pathname) === -1 ?
                  // @ts-ignore
                  <Link as={NextLink} href={{ pathname: '/auth/login', query: { return_url: pathname } }}>Login</Link> :
                  <Link as={NextLink} href='/auth/login'>Login</Link>
              }

            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color='primary' href='/auth/register' variant='flat'>
                Register
              </Button>
            </NavbarItem>
          </Default>
        </Switch>
      </NavbarContent>
    </NavbarContainer>
  )
    ;
}