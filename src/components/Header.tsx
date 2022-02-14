import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuAlt3Icon } from '@heroicons/react/outline';
import { InfoCircledIcon } from '@radix-ui/react-icons';

const solutions = [
  {
    name: 'Learn More',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: InfoCircledIcon,
  },
];

function Header() {
  return (
    <Popover className='font-mono'>
      {({ open }) => (
        <>
          <div className='mx-auto px-8'>
            <div className='fixed top-0 left-6 right-6 flex justify-between items-center border-b border-gray-100 py-6 bg-opacity-5 backdrop-filter backdrop-blur-lg'>
              <div className='flex justify-start lg:w-0 lg:flex-1'>
                <a href='/'>
                  <span className='header-link font-bold text-xl'>Canvas</span>
                </a>
              </div>
              <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center hover:text-gray-900 hover:bg-gray-100'>
                <span className='sr-only'>Open menu</span>
                <MenuAlt3Icon className='h-6 w-6' aria-hidden='true' />
              </Popover.Button>
              <Popover.Overlay
                className={`${open ? 'fixed inset-0' : 'opacity-0'}`}
              />
            </div>
          </div>

          <Transition
            as={Fragment}
            enter='duration-200 ease-out'
            enterFrom='opacity-0 scale-95'
            enterTo='opacity-100 scale-100'
            leave='duration-100 ease-in'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-95'
          >
            <Popover.Panel
              focus
              className='absolute right-0 top-20 transition transform origin-top-right z-10 w-auto max-w-sm pr-6'
            >
              <div className='overflow-hidden rounded-lg shadow-md ring-1 ring-gray-200 bg-white divide-y-2 divide-gray-50'>
                <div className='pb-6 px-6'>
                  <div className='mt-6'>
                    <nav className='grid gap-y-6'>
                      {solutions.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className='-m-3 p-3 flex items-center rounded-lg hover:bg-gray-50'
                        >
                          <item.icon
                            className='flex-shrink-0 h-6 w-6 text-gray-600'
                            aria-hidden='true'
                          />
                          <span className='ml-3 font-medium text-gray-900'>
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
                <div className='py-6 px-5 space-y-6'>
                  <div>
                    <a
                      href='/'
                      className='w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm font-medium text-white bg-red-500 hover:bg-red-600'
                    >
                      Sign up
                    </a>
                    <p className='mt-6 text-center text-sm font-medium text-gray-500'>
                      Already have an account?{' '}
                      <a href='/' className='text-red-500 hover:underline'>
                        Log in
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default Header;
