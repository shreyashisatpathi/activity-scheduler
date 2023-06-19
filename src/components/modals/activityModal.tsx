import Modal from './modal';
import { FC, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useActivityModal from '../../hooks/useActivityModal';
import { activityTypes, pitches, users } from '../../mock/data';
import type { ActivityType } from '../../type';
import { nanoid } from 'nanoid'


type Props = {
  getActivities?: (data: ActivityType) => void
  editableActivity?: ActivityType
}

const ActivityModal :FC<Props>= ({getActivities, editableActivity}) => {
  const { isOpen, closeModal } = useActivityModal();
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      activityType: editableActivity?.activityType,
      dateTime: '',
      user: '',
      pitch: '',
    },
  });

  // setValue('activityType', editableActivity?.activityType)

  const activityType = watch('activityType');
  const dateTime = watch('dateTime');
  const user = watch('user');
  const pitch = watch('pitch');

  const radio = (value: string, registerField: string) => {
    return (
      <>
        <label className="inline-block">
          <input
            {...register(registerField, { required: true })}
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
          return radio(activity.label, 'activityType');
        })}
      </div>
      <p className="font-semibold pt-2">Choose date and time</p>
      <input
        className="border-solid border-gray-300 border py-2 px-4 w-full rounded"
        type="datetime-local"
        placeholder="Date and Time"
        {...register('dateTime', { required: true })}
      />
      <p className="font-semibold pt-2">Select an User</p>
      <select {...register('user', { required: true })}>
        {users.map((user) => {
          return <option value={user.name}>{user.name}</option>
        })}
      </select>
      <p className="font-semibold pt-2">Select a Pitch for this Activity</p>
      {pitches.map((pitch) => {
        return radio(pitch.label, 'pitch')
      })}
    </div>
  );

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if(getActivities){
      getActivities({...data as ActivityType, id: nanoid(5)})
    }
    closeModal()
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
