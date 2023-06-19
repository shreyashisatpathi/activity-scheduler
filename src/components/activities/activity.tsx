import React, { FC, useState } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { AiFillDelete } from 'react-icons/ai';
import { ActivityType } from '../../type';
import ActivityModal from '../modals/activityModal';
import useActivityModal from '../../hooks/useActivityModal';

type ExtenedActivityType<T> = T & {
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};

const Activity: FC<ExtenedActivityType<ActivityType>> = ({
  handleDelete,
  handleEdit,
  id,
  activityType,
  user,
  dateTime,
  pitch,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const { openModal } = useActivityModal();

  const handleEditClick = (id: string) => {
    console.log('received a click');

    setIsEditing(true);
    handleEdit(id);
    openModal();
  };

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="flex flex-row">
          <div className="grow font-bold text-xl mb-2">{activityType}</div>
          <div className="grow-0 flex flex-row">
            <button
              className="pl-4 sm:pl-0"
              onClick={() => handleEditClick(id)}
            >
              <AiFillEdit />
            </button>

            <button className="pl-4 sm:pl-2" onClick={() => handleDelete(id)}>
              <AiFillDelete />
            </button>
          </div>
        </div>
        <p className="text-gray-700 text-base">
          {new Date(dateTime).toLocaleDateString()}
        </p>
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
