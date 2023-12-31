import Modal from './modal';
import { FC, useEffect, useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useActivityModal from '../../hooks/useActivityModal';
import { activityTypes, pitches, users } from '../../mock/data';
import type { ActivityType } from '../../type';
import { nanoid } from 'nanoid';

type Props = {
  getActivities: (data: ActivityType) => void;
  editableActivity?: ActivityType;
  resetForm?: boolean;
  updateActivity: (data: ActivityType) => void;
  isEditMode: boolean;
};

const ActivityModal: FC<Props> = ({
  getActivities,
  editableActivity,
  resetForm,
  updateActivity,
  isEditMode,
}) => {
  const { isOpen, closeModal } = useActivityModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        activityType: '',
        dateTime: new Date(),
        user: '',
        pitch: '',
      };
    }, [editableActivity]),
  });


  const resetActivity = () => {
    const { activityType, dateTime, user, pitch } = editableActivity || {};
    reset({ activityType, dateTime, user, pitch });
  };

  useEffect(() => {
    if (resetForm) {
      resetActivity();
    }
  }, [editableActivity]);


  const getRadio = (value: string, registerField: 'activityType' | 'pitch') => {
    return (
      <>
        <label className="inline-block">
          <input
            {...register(registerField, {
              required: `Please select a ${registerField}`,
            })}
            type="radio"
            value={value}
          />
          {value}
        </label>
      </>
    );
  };

  let bodyContent = (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Choose one of the Activity Type</p>
      <div className="grid grid-cols-2 md:grid-col-2 sm:grid-cols-3 gap-3 max-h-[50vh] overflow-y-auto ">
        {activityTypes.map((activity) => {
          return getRadio(activity.label, 'activityType');
        })}
      </div>
      <small className="text-red-600">
        {errors?.activityType && errors.activityType.message}
      </small>
      <p className="font-semibold pt-2">Choose date and time:</p>
      <input
        className="border-solid border-gray-300 border py-2 px-4 w-full rounded"
        type="datetime-local"
        {...register('dateTime', {
          required: 'Please enter a date and activity time',
        })}
      />
      <small className="text-red-600">
        {errors?.dateTime && errors.dateTime.message}
      </small>
      <p className="font-semibold pt-2">Select an User</p>
      <select {...register('user', { required: 'Please select a user' })}>
        {users.map((user) => {
          return <option value={user.name}>{user.name}</option>;
        })}
        defaultValue={editableActivity?.user}
      </select>
      <small className="text-red-600">
        {errors?.user && errors.user.message}
      </small>
      <p className="font-semibold pt-2">Select a Pitch for this Activity</p>
      {pitches.map((pitch) => {
        return getRadio(pitch.label, 'pitch');
      })}
      <small className="text-red-600">
        {errors?.pitch && errors.pitch.message}
      </small>
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const itemId = editableActivity?.id as string;
    const editedActivity = { ...(data as ActivityType), id: itemId };
    
    //If modal opened in edit mode then onsubmit will update an activity else will create
    if (isEditMode) {
      updateActivity(editedActivity);
    } else {
      getActivities({ ...(data as ActivityType), id: nanoid(5) });
    }

    closeModal();
  };

  return (
    <Modal
      onClose={closeModal}
      onSubmit={handleSubmit(onSubmit)}
      isOpen={isOpen}
      title="Schedule an Activity"
      actionLabel={'Submit'}
      body={bodyContent}
    />
  );
};

export default ActivityModal;
