interface AddPrepaymentButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function AddPrepaymentButton({ onClick, disabled }: AddPrepaymentButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={disabled ? "Max prepayments reached (one per month)" : undefined}
      className="clay-btn py-2.5 px-5 rounded-xl flex items-center justify-center gap-2 font-bold text-sm w-full sm:w-auto disabled:opacity-40 disabled:cursor-not-allowed"
    >
      <span className="text-lg leading-none">+</span> Add Prepayment
    </button>
  );
}
