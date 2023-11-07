interface InputErrorsProps {
  name: string
  errors: Record<string, string[]> | undefined
}
export function InputError ({ name, errors }: InputErrorsProps) {
  return (
    <>
      {errors?.[name] && (
        <div id={`${name}-error`} aria-live="polite" className="text-sm text-red-500">
          {errors[name].map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </>
  )
}
