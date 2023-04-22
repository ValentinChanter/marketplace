import { User } from "./api/user";
import { GetServerSideProps } from 'next'
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from '@/lib/session';
import Layout from "@/components/layout";
import StatusLockedPage from "@/components/statusLockedPage";
import fetchJson from "@/lib/fetchJson";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";

const MapWithNoSSR = dynamic(() => import("@/components/map"), { ssr: false });

export default function Delivery({user}: {user:User}) {
	const [currDate, setCurrDate] = useState(new Date()) as [Date, Function];
	const [packages, setPackages] = useState() as [any, Function];
	const [deliveryStatus, setDeliveryStatus] = useState({}) as [any, Function];
	const [isLoading, setIsLoading] = useState(false) as [boolean, Function];

	return (
		<>
			<StatusLockedPage user={user} status="DELIVERY" f={async () => {
				useEffect(() => {
					currDate.setHours(0, 0, 0, 0);

					const body = {
						id: user.id,
						date: currDate
					};
					
					fetchJson("/api/delivery", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(body),
					}).then((res: any) => {
						const packages = res.packages;
						packages.map((pack:any) => {
							if (pack.isDelivered) {
								setDeliveryStatus({
									...deliveryStatus,
									[pack.id]: "delivered"
								});
							}
						})
						setPackages(res.packages);
					});
				}, [])
			}}>
				<Layout pageName={"Mes livraisons"} user={user}>
					<div className="flex flex-col w-full">
						<p className="text-4xl font-bold">Bonjour {user?.name} !</p>
						<br />
						<div className="p-5 border rounded-md">
							<div>
								<div className="flex flex-row justify-center">
									<button className={`text-mkDarkBlue rounded-full bg-mkOrange w-7 h-7 mr-5 shadow" ${isLoading || !checkMinusDate(currDate) ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e7a08c] active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all"}`} onClick={() => {
										if (!isLoading && checkMinusDate(currDate)) {
											const newDate = new Date(currDate);
											newDate.setDate(newDate.getDate() - 1);
											newDate.setHours(0, 0, 0, 0);

											setIsLoading(true);
											setCurrDate(newDate);

											const body = {
												id: user.id,
												date: newDate
											};
											
											fetchJson("/api/delivery", {
												method: "POST",
												headers: { "Content-Type": "application/json" },
												body: JSON.stringify(body),
											}).then((res: any) => {
												const packages = res.packages;
												packages.map((pack:any) => {
													if (pack.isDelivered) {
														setDeliveryStatus({
															...deliveryStatus,
															[pack.id]: "isDelivered"
														});
													}
												})
												setPackages(res.packages);
												setIsLoading(false);
											});
										}
									}}>❮</button>

									<p className="text-2xl font-lg">Vos livraisons du {formatDate(currDate)}</p>
									
									<button className={`text-mkDarkBlue rounded-full bg-mkOrange w-7 h-7 ml-5 shadow" ${isLoading || !checkPlusDate(currDate) ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e7a08c] active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all"}`} onClick={() => {
										if (!isLoading && checkPlusDate(currDate)) {
											const newDate = new Date(currDate);
											newDate.setDate(newDate.getDate() + 1);
											newDate.setHours(0, 0, 0, 0)

											setIsLoading(true);
											setCurrDate(newDate);

											const body = {
												id: user.id,
												date: newDate
											};
											
											fetchJson("/api/delivery", {
												method: "POST",
												headers: { "Content-Type": "application/json" },
												body: JSON.stringify(body),
											}).then((res: any) => {
												const packages = res.packages;
												packages.map((pack:any) => {
													if (pack.isDelivered) {
														setDeliveryStatus({
															...deliveryStatus,
															[pack.id]: "isDelivered"
														});
													}
												})
												setPackages(res.packages);
												setIsLoading(false);
											});
										}
									}}>❯</button>
								</div>
								<hr className="mt-5" />
								<div className="m-1 flex flex-col p-2">
									{/* Renvoie une icône de chargement si l'utilisateur a cliqué sur + ou - et doit attendre la réponse serveur,
									 /* sinon les commandes à livrer (s'il y en a),
									 /* sinon un message annonçant aucune commande à livrer
									 /* Par défaut (avant que les infos soient récupérées, étant donné que la résolution du TSP est un peu longue), l'icône de chargement est affichée
									 */}
									{isLoading ? (
										<div className="flex justify-center p-9 my-auto">
											<Image src="/loading.gif" width={150} height={150} alt="Logo" className="mx-auto" priority />
										</div>
									) : packages ? (packages[0] ? packages.slice(1).map((pack:any) => {
										return (
											<div className="text-mkDarkBlue bg-mkGreen rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all flex flex-row p-5 my-3" key={pack.id}>
												<p className="my-auto mx-7 text-xl font-semibold">Commande n°{pack.id}</p>
												<div className="flex flex-col">
													<p className="font-light text-lg">{pack.firstName + " " + pack.lastName}</p>
													<p className="text-lg">Au {pack.address}</p>
												</div>
												<div className="ml-auto">
													<button className={`rounded-full bg-mkOrange p-3 w-60 mr-5 shadow " ${deliveryStatus[pack.id] === "isDelivered" ? "opacity-50 cursor-not-allowed" : "hover:bg-[#e7a08c] active:shadow-sm hover:shadow-md hover:-translate-y-1 active:-translate-y-0 active:bg-mkOrange transition-all"}`} onClick={async () => {
														if (!deliveryStatus[pack.id]) {
															const body = { id: pack.id };
														
															const res = await fetchJson("/api/confirmDelivery", {
																method: "POST",
																headers: { "Content-Type": "application/json" },
																body: JSON.stringify(body)
															}) as any;
	
															if (res.isDelivered) {
																setDeliveryStatus({
																	...deliveryStatus,
																	[pack.id]: "isDelivered"
																});
															}
														}
													}}>{deliveryStatus[pack.id] === "isDelivered" ? "Livré !" : "Confirmer la livraison"}</button>
												</div>
											</div>
										)
									}) : (
										<span className="mt-10 text-center text-xl">Aucune commande à livrer !</span>
									)) : (
										<div className="flex justify-center p-9 my-auto">
											<Image src="/loading.gif" width={150} height={150} alt="Logo" className="mx-auto" priority />
										</div>
									)}
								</div>
							</div>

							<div className={`w-full p-3.5 ${packages && !packages[0] ? "invisible" : ""}`}>
								{packages && packages[0] ? (
									<MapWithNoSSR addresses={packages.map((pack:any) => {
										return {
											lat: pack.latitude,
											lng: pack.longitude
										}
									})} />
								) : (
									<></>
								)}
							</div>
						</div>
					</div>
				</Layout>
			</StatusLockedPage>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {
      const user = req.session.user;
  
		return {
			props: {
			user: user || null,
			},
		};
    }, sessionOptions
);

// Renvoie une date en format JJ/MM/YYYY
function formatDate(date?: Date) {
	if (!date) date = new Date();
	const day = date.getDate();
	const strDay = day < 10 ? "0" + day : day;
	const month = date.getMonth() + 1;
	const strMonth = month < 10 ? "0" + month : month;
	const year = date.getFullYear();

	return `${strDay}/${strMonth}/${year}`;
}

// Renvoie vrai si newDate (ou la veille de date) est après aujourd'hui
function checkMinusDate(date: Date, newDate?: Date) {
	if (!newDate) {
		newDate = new Date(date);
		newDate.setDate(newDate.getDate() - 1);
		newDate.setHours(23, 59, 59, 59)
	}

	return newDate.getTime() >= (new Date()).getTime();
}

// Vérifier que newDate n'est pas 7 jours après aujourd'hui
function checkPlusDate(date: Date, newDate?: Date) {
	if (!newDate) {
		newDate = new Date(date);
		newDate.setDate(newDate.getDate() + 1);
		newDate.setHours(0, 0, 0, 0)
	}

	return ((newDate.getTime() - (new Date()).getTime()) / (1000 * 3600 * 24)) <= 7;
}