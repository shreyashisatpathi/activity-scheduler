import useActivityModal from '../../hooks/useActivityModal';
import Button from '../Button/Button';

const AddActivity = () => {
  const { openModal } = useActivityModal();

  return <Button label={'Add Activity'} onClick={openModal} outline />;
};

export default AddActivity;
