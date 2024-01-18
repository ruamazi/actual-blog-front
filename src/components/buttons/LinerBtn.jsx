const LinerBtn = ({ children }) => {
  return (
    <button
      className="px-4 py-1 text-white bg-gradient-to-l from-indigo-400 via-purple-500 to-pink-400
     rounded-full hover:bg-gradient-to-r"
    >
      {children}
    </button>
  );
};

export default LinerBtn;
