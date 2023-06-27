type GameControlsProps = {
  handleReset: () => void;
};

const GameControls: React.FC<GameControlsProps> = ({ handleReset }) => {
  return (
    <div className="flex space-x-4">
      <button onClick={handleReset} className="btn btn-red">
        Reset
      </button>
    </div>
  );
};

export default GameControls;
