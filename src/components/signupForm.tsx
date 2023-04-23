import { FormEvent } from 'react'

export default function SignupForm({
	errorMessage,
	successMessage,
	onSubmit,
}: {
	errorMessage: string
	successMessage: string,
	onSubmit: (e: FormEvent<HTMLFormElement>) => void
}) {
	return (
		<>
				<form onSubmit={onSubmit}>
						<div className='grid gap-6 mb-6 md:grid-cols-2'>
								<div>
										<label className="block mb-2 text-base font-medium text-gray-900">Prénom</label>
										<input type="text" name="firstName" required className='p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700 w-full' />
								</div>
								<div>
										<label className="block mb-2 text-base font-medium text-gray-900">Nom</label>
										<input type="text" name="lastName" required className='p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700 w-full' />
								</div>
								<div>
										<label className="block mb-2 text-base font-medium text-gray-900">Adresse mail</label>
										<input type="email" name="email" required className='p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700 w-full' />
								</div>
								<div>
										<label className="block mb-2 text-base font-medium text-gray-900">Mot de passe</label>
										<input type="password" name="password" required className='p-2 mt-1 mb-4 border-solid border rounded border-gray-600 focus:border-gray-700 w-full' />
								</div>
						</div>

						<button type="submit" className="text-mkDarkBlue w-full rounded-md bg-mkOrange p-2 text mr-5 hover:bg-[#e7a08c] shadow active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all">S'inscrire</button>

						{errorMessage && <p className="text-red-600 mt-4 mb-2">{errorMessage}</p>}
						{successMessage && <p className="text-green-600 mt-4 mb-2">{successMessage}</p>}
				</form>
		</>
	)
}