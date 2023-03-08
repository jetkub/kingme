import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Auth from "../utils/auth";

import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";

// this is a little helper function that will join classNames together so that
// we can do conditional classNames and join them with the rest like in the "example clickable link item"
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const logout = (event) => {
  event.preventDefault();
  Auth.logout();
};

const UserMenu = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || {};

  // auth check
  if (!Auth.loggedIn()) {
	return null;
	  }
	  
  // if there's no user data, return null
  if (!user) {
	return null;
	  }

  // if data isn't here yet, say so
  if (loading) {
    return <div>Loading...</div>;
  }

  
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="">
        <Menu.Button className="flex h-full w-full items-center justify-center gap-x-1.5 rounded-none border-4 border-neutral-800 bg-neutral-50 px-6 py-2 font-base text-lg font-bold text-neutral-900 ring-1 ring-inset ring-gray-300 hover:bg-neutral-200">
          user
          <ChevronDownIcon
            className="-mr-1 mt-0.5 h-5 w-5 stroke-red-600 text-neutral-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-72 origin-top-right divide-y-2 divide-neutral-400 rounded-none border-4 border-t-0 border-neutral-800 bg-neutral-200 font-base text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3">
            <p className="text-base text-neutral-900">Signed in as</p>
            <p className="truncate font-medium text-neutral-800">
              {user.email}
            </p>
          </div>
          <div className="py-1">
            <Menu.Item>
              <p className={"bg-neutral-5 block px-4 py-2 text-neutral-700"}>
                Total Games: {user.totalGames}
              </p>
            </Menu.Item>
            <Menu.Item>
              <p className={"bg-neutral-5 block px-4 py-2 text-neutral-700"}>
                Wins: {user.wins}
              </p>
            </Menu.Item>
            <Menu.Item>
              <p className={"bg-neutral-5 block px-4 py-2 text-neutral-700"}>
                Losses: {user.losses}
              </p>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={logout}
                  type="button"
                  className={classNames(
                    active
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-700",
                    "block w-full px-4 py-2 text-left"
                  )}
                >
                  log out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserMenu;
