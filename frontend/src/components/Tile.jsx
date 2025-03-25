import React from 'react';

const Tile = ({ image, name, role, email, info, domains = [], slots }) => {
  return (
    <div className="flex">
      <div className="bg-white shadow-xl rounded-lg my-10 mx-2 w-full gap-4 flex flex-col justify-between">

        <img
          src={image}
          alt={name}
          className="rounded-t-md object-cover w-full "
        />

        <div className="flex flex-col justify-between gap-4 pb-4 px-5 py-2  text-md h-full">
          <div className='flex flex-col gap-1'>
            <h2 className="font-semibold text-gray-900">{name}</h2>
            <p className="text-gray-600">{role}</p>
            <p className="text-gray-600">{email}</p>
            {domains.length > 0 ? (
              <p className="text-gray-600">
                <strong>Domains:</strong> {domains.join(", ")}
              </p>
            ) : null}
          </div>

          <div className="flex flex-col items-center mt-auto">
            <a href={info} target="_blank" rel="noreferrer">
              <button className="bg-sky-900 hover:bg-blue-700 text-white px-7 py-1 my-1 rounded-md">
                View Information
              </button>
            </a>
            <button className="bg-sky-900 hover:bg-blue-700 text-white px-6 py-1 mt-1 rounded-md">
              Request Guideship
            </button>
            <p className="pt-2">{slots} slots remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tile;
