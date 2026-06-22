interface AddPrepaymentButtonProps {
  onClick: () => void;
}

export function AddPrepaymentButton({ onClick }: AddPrepaymentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="clay-btn py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm w-full sm:w-auto"
    >
      <span className="text-lg leading-none">+</span> Add Prepayment
    </button>
  );
}
