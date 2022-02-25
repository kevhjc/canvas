import {
  Fragment,
  useState,
  useContext,
  useRef,
  MutableRefObject,
} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './../supabaseClient';
import { Dialog, Transition } from '@headlessui/react';

import { IAddTaskProps } from '../lib/interfaces';

import { validateTask } from '../utils/validation';
import { SessionContext } from '../context/SessionContext';

const AddTask = ({ userEntries, setUserEntries }: IAddTaskProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const session = useContext(SessionContext);
  const [open, setOpen] = useState(true);
  const newTaskTitleRef = useRef() as MutableRefObject<any>;
  const cancelButtonRef = useRef(null);

  const [helperText, setHelperText] = useState<any>({
    error: null,
    text: null,
  });

  const addTask = async () => {
    let newTaskInput = newTaskTitleRef.current.value;
    let title = newTaskInput.trim();

    try {
      const taskError = validateTask(newTaskInput);
      let { data: tasks, error } = await supabase
        .from('entries')
        .insert({
          title: title,
          user_id: session.user.id,
          category: 'task',
        })
        .single();
      if (taskError || error) {
        setHelperText({
          error: true,
          text: taskError,
        });
        console.log('Error adding task: ', error);
      } else {
        setOpen(false);
        setUserEntries([tasks, ...userEntries]);
        newTaskTitleRef.current.value = '';
        return navigate('/home/?category=task');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClose = () => {
    setOpen(false);
    return location.search === '' ? navigate('/home') : navigate(-1);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={handleModalClose}
      >
        <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-neutral-100 backdrop-blur-lg transition-opacity dark:bg-neutral-900" />
          </Transition.Child>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block w-[420px] transform overflow-hidden rounded-md border border-neutral-200 bg-white text-left shadow-2xl transition-all sm:my-8 sm:align-middle dark:border-neutral-700/80 dark:bg-neutral-800 dark:text-neutral-100/80">
              <div className="pl-5 pt-3 pb-2 font-mono font-black text-sky-500 dark:text-sky-400">
                New task
              </div>
              <div className="px-4 pt-2 pb-4">
                <input
                  ref={newTaskTitleRef}
                  type="text"
                  onKeyUp={(e) => e.key === 'Enter' && addTask()}
                  placeholder="Task"
                  className={
                    'w-full bg-white px-1 py-2 pt-1 text-neutral-900 outline-none backdrop-blur-sm dark:border-neutral-700/80 dark:bg-neutral-800/80 dark:text-white dark:placeholder:text-neutral-100/60'
                  }
                />
              </div>
              <div className="grid grid-cols-1 items-center justify-between border-t bg-white px-4 py-4 dark:border-neutral-700/80 dark:bg-neutral-800/80">
                <div className="col-start-1">
                  {helperText.error && (
                    <p className="pl-1 text-xs font-bold text-red-600 dark:text-red-500">
                      {helperText.text}
                    </p>
                  )}
                </div>
                <div className="col-end-3">
                  <button
                    type="submit"
                    className="ml-4 inline-flex w-auto justify-center rounded border border-neutral-200 bg-white px-4 py-1 text-base font-medium text-neutral-700 hover:bg-neutral-100/80 focus:outline-none dark:border-neutral-500 dark:bg-neutral-500 dark:text-white dark:hover:border-neutral-600/80 dark:hover:bg-neutral-600/80"
                    onClick={handleModalClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-4 inline-flex w-auto justify-center rounded border border-sky-500 bg-sky-500 px-4 py-1 text-base font-medium text-white hover:border-sky-600 hover:bg-sky-600 focus:outline-none"
                    onClick={addTask}
                  >
                    Add task
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default AddTask;
