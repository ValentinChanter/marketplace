import { FormEvent } from 'react'

export default function LoginForm({
  errorMessage,
  onSubmit,
}: {
  errorMessage: string
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col">

      <label className="font-semibold">Adresse mail</label>
      <input type="email" name="email" required className='p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700' />
      <label className="font-semibold">Mot de passe</label>
      <input type="password" name="password" required className='p-2 mt-1 mb-4 border-solid border rounded border-gray-600' />

      <button type="submit" className="text-mkDarkBlue w-full rounded-md bg-mkOrange p-2 text mr-5 hover:bg-[#e7a08c] shadow active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all">Connexion</button>

      {errorMessage && <p className="text-red-600 mt-4 mb-2">{errorMessage}</p>}
    </form>
  )
}