import Tax from "./Tax";

export default class Installment {
	status: string;
	mdr = 0;

	constructor (readonly number: number, readonly amount: number, readonly tax: Tax) {
		this.status = "waiting_payment";
		this.calculateMdr();
	}

	calculateMdr () {
		if (this.tax.amount) {
			this.mdr += this.tax.amount;
		}
		if (this.tax.percentage) {
			this.mdr += ((this.tax.percentage * this.amount)/100);
		}
	}
}
