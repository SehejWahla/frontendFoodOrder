const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl font-bold tracking-tight text-orange-500 mb-4">
        quickEats.com
      </div>
      <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
