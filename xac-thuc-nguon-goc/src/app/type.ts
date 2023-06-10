export interface Farm extends FarmForm{
	id: number;
	active: boolean;
	wallet: string;
}

export interface FarmForm{
	name: string;
	content: string;
	thumbnail: string;
	company: string;
	money: number;
}


export interface FarmBuy{
	id: string;
	buyedIds: number[];
}

export interface Production extends ProductionForm{
	id: number;
	wallet: string;
}

export interface ProductionForm{
	name: string;
	content: string;
	thumbnail: string;
	company: string;
	money: number;
	QR:string;
}