import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const SearchBar = () => {
  const {
    register,
    getValues,
    formState: { isValid, errors },
    handleSubmit,
    watch,
  } = useForm<any>({
    mode: 'onChange',
  });
  const watchValue = watch();
  const [toggle, setToggle] = useState<boolean>(false);
  function clickSearch() {
    setToggle(!toggle);
  }

  return (
    <form onClick={clickSearch}>
      <input
        {...register('search')}
        placeholder="search"
        name="search"
        type="text"
        className="search-input w-[400px] z-50"
      />
      {toggle && watchValue.search && <SearchList search={watchValue.search} />}
    </form>
  );
};

export default SearchBar;

type Props = {
  search: string | undefined;
};

const SearchList = ({ search }: Props) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full">
      <ol className="absolute top-16 left-[192px] mt-2 w-[400px] shadow-lg bg-white rounded-lg overflow-hidden">
        {/* {(results.length > 0 &&
          results?.map((result) => (
            <li
              key={result}
              className="hover:bg-middleBlue transition px-4 py-3 w-full text-sm text-darkGray border-2 border-lightGray"
            >
              {result}
            </li>
          ))) || ( */}
        <li className="hover:bg-middleBlue transition px-4 py-3 w-full text-sm text-darkGray border-2 border-lightGray">
          {`"${search}"에 대한 검색 결과가 없습니다.`}
        </li>
        {/* )} */}
      </ol>
    </div>
  );
};
