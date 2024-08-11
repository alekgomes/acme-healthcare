export const ErrorMessage: React.FC<any> = ({ errors, fieldName }) => {
  if (!errors?.hasOwnProperty(fieldName)) return null;

  const error = errors[fieldName];
  const errorMessage = error.message;

  return (
    <div
      aria-live="polite"
      className="mt-2 text-sm text-rose-500 border border-rose-500 bg-rose-500/10 rounded-sm"
    >
      <p className="flex items-center py-1 font-medium rounded-sm">
        {errorMessage}
      </p>
    </div>
  );
};
