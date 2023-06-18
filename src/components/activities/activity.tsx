import React, { FC } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';

type Props = {
  type: string;
  user: string;
  date: Date;
  pitch: string;
};

const Activity: FC<Props> = ({ type, user, date, pitch }) => {
  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="flex flex-row">
          <div className="grow font-bold text-xl mb-2">{type}</div>
          <div className="grow-0 flex flex-row">
            
              <button className="pl-4 sm:pl-0">
                <AiFillEdit />
              </button>
            
            
              <button className="pl-4 sm:pl-2">
                <AiFillDelete />
              </button>
           
          </div>
        </div>
        <p className="text-gray-700 text-base">{date.toISOString()}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {pitch}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {user}
        </span>
      </div>
    </div>
  );
};

export default Activity;
