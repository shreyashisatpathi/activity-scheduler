import useActivityModal from '../../hooks/useActivityModal';

const AddActivity = () => {
  const { openModal } = useActivityModal();

  return (
    <button className="bg-sky-500/100 rounded" onClick={openModal}>
      Add Activity
    </button>
  );
};

export default AddActivity;
