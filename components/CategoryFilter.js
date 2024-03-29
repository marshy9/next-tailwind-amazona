/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import PaddleItem from './PaddleItem';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  FunnelIcon,
  MenuAlt1Icon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid';
import Slider from '@mui/material/Slider';

const sortOptions = [
  //{ name: 'Most Popular', href: '#', current: true },
  //{ name: 'Best Rating', href: '#', current: false },
  //{ name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', current: false },
  { name: 'Price: High to Low', current: false },
];
const subCategories = [
  { name: 'Raw Carbon', href: '#' },
  { name: 'Elongated Handle', href: '#' },
  { name: 'Hole Punch', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Function to extract unique brand values from paddles
const extractUniqueBrands = (paddles) => {
  const brandsSet = new Set();
  paddles.forEach((paddle) => {
    brandsSet.add(paddle.brand);
  });
  return Array.from(brandsSet).map((brand) => ({
    value: brand,
    label: brand,
    checked: false,
  }));
};

export default function CategoryFilter({
  paddles,
  addToCartHandler,
  cartItems,
}) {
  //open and close filters
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  //filter paddle arrary
  const [selectedFilters, setSelectedFilters] = useState({});
  const [filteredPaddles, setFilteredPaddles] = useState(paddles);
  // State to track the selected sorting option
  const [selectedSortOption, setSelectedSortOption] = useState(sortOptions[0]);
  //slider price range
  const [priceRange, setPriceRange] = useState([0, 300]);
  const minDistance = 10;

  const filters = [
    {
      id: 'brand',
      name: 'Brand',
      options: extractUniqueBrands(paddles), // Populate brand options dynamically
    },
    {
      id: 'shape',
      name: 'Shape',
      options: [
        { value: 'Standard', label: 'Standard', checked: false },
        { value: 'Elongated', label: 'Elongated', checked: false },
        { value: 'Blade', label: 'Blade', checked: false },
        { value: 'Teardrop', label: 'Teardrop', checked: false },
        { value: 'Widebody', label: 'Widebody', checked: false },
      ],
    },
    {
      id: 'thickness',
      name: 'Core Thickness',
      options: [
        { value: 'thin', label: 'Thin (0mm - 12mm)', checked: false },
        {
          value: 'standard',
          label: 'Standard (12.1mm - 14mm)',
          checked: false,
        },
        { value: 'thick', label: 'Thick (14.1mm - 16mm)', checked: false },
        { value: 'oversized', label: 'Oversized (< 16.1mm)', checked: false },
      ],
    },
  ];

  // Function to apply filters and update the filteredPaddles state
  const applyFilters = () => {
    let filteredPaddles = [...paddles];
    console.log('Applying filter');
    console.log(filteredPaddles);
    console.log('List of filters');
    console.log(selectedFilters);

    // Apply price filter
    filteredPaddles = filteredPaddles.filter((paddle) => {
      const price = paddle.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    // Loop through the selected filters and apply them to the paddles
    for (const filter in selectedFilters) {
      if (selectedFilters[filter].length > 0) {
        if (filter === 'brand') {
          console.log('xxx');
          console.log(selectedFilters[filter]);
          filteredPaddles = filteredPaddles.filter((paddle) =>
            selectedFilters[filter].includes(paddle.brand)
          );
        }
        if (filter === 'shape') {
          filteredPaddles = filteredPaddles.filter((paddle) =>
            selectedFilters[filter].includes(paddle.shape)
          );
          // Handle other filter types similarly if needed
        }
        if (filter === 'thickness') {
          // Handle other filter types similarly if needed
        }
      }
    }
    console.log('Final filter');
    console.log(filteredPaddles);
    setFilteredPaddles(filteredPaddles);
  };

  // Handle filter changes
  useEffect(() => {
    applyFilters();
  }, [selectedFilters, priceRange, paddles]);

  // Function to handle checkbox change for filters
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType]?.includes(value)
        ? prevFilters[filterType].filter((v) => v !== value)
        : [...(prevFilters[filterType] || []), value],
    }));
  };

  // Function to handle sorting change
  const handleSortChange = (sortOption) => {
    setSelectedSortOption(sortOption);
    if (sortOption.name === 'Price: Low to High') {
      // Sort the paddles by price low to high
      setFilteredPaddles(
        [...filteredPaddles].sort((a, b) => a.price - b.price)
      );
    } else if (sortOption.name === 'Price: High to Low') {
      setFilteredPaddles(
        [...filteredPaddles].sort((a, b) => b.price - a.price)
      );
    }
  };

  // Function to handle price slider
  const handlePriceChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance);
        setPriceRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceRange([clamped - minDistance, clamped]);
      }
    } else {
      setPriceRange(newValue);
    }
    // Call applyFilters to apply all filters
    applyFilters();
  };

  // Render the filtered paddles
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <a href={category.href} className="block px-2 py-3">
                            {category.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                    {/* Mobile Price Slider Section */}
                    <Disclosure
                      as="div"
                      key="price"
                      className="border-t border-gray-200 px-4 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-mx-2 -my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                Price
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <Slider
                              getAriaLabel={() => 'Minimum distance'}
                              value={priceRange}
                              max={300} // Set the maximum value
                              onChange={handlePriceChange}
                              valueLabelDisplay="auto"
                              disableSwap
                            />
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                    {/* Filters Section */}
                    {filters.map((section) => {
                      return (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        value={option.value}
                                        type="checkbox"
                                        checked={
                                          selectedFilters[section.id]?.includes(
                                            option.value
                                          ) || false
                                        }
                                        onChange={() =>
                                          handleFilterChange(
                                            section.id,
                                            option.value
                                          )
                                        }
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      );
                    })}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            {/* <h1 className="text-4xl font-bold mr-4 tracking-tight sm:text-4xl text-gray-900">
              Latest Paddles
            </h1> */}

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? 'font-medium text-gray-900'
                                  : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                              onClick={() => handleSortChange(option)} // Call the handleSortChange function
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                {/* <MenuAlt1Icon className="h-5 w-5" aria-hidden="true" /> */}
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>
                {/* Price Slider Section */}
                <Disclosure
                  as="div"
                  key="price"
                  className="border-b border-gray-200 py-6"
                >
                  {({ open }) => (
                    <>
                      <h3 className="-my-3 flow-root">
                        <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            Price
                          </span>
                          <span className="ml-6 flex items-center">
                            {open ? (
                              <MinusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            ) : (
                              <PlusIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            )}
                          </span>
                        </Disclosure.Button>
                      </h3>
                      <Disclosure.Panel className="pt-6">
                        <Slider
                          getAriaLabel={() => 'Minimum distance'}
                          value={priceRange}
                          max={300} // Set the maximum value
                          onChange={handlePriceChange}
                          valueLabelDisplay="auto"
                          disableSwap
                        />
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>

                {/* Filters Section */}
                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options?.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  checked={
                                    selectedFilters[section.id]?.includes(
                                      option.value
                                    ) || false
                                  }
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3 grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredPaddles.map((paddle) => (
                  <PaddleItem
                    paddle={paddle}
                    key={paddle.slug}
                    addToCartHandler={addToCartHandler}
                    cartItems={cartItems}
                  ></PaddleItem>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
