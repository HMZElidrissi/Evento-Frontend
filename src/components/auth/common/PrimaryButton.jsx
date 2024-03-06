const PrimaryButton = ({ type, children, className }) => {
  return (
    <button
      type={type}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-evento-700 hover:bg-evento-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-evento-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
