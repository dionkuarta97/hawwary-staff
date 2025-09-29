import Spinner from '@material-tailwind/react/dist/components/spinner';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner size="xl" />
    </div>
  );
};

export default Loading;
