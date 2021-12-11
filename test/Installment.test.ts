import Installment from "../src/Installment";
import Tax from "../src/Tax";

test("Deve criar uma parcela com MDR percentual e absoluto", function () {
	const tax = new Tax("credit_card", 1, 0.5);
	const installment = new Installment(1, 1000, tax);
	expect(installment.mdr).toBe(10.50);
});

test("Deve criar uma parcela sem MDR", function () {
	const tax = new Tax("credit_card", 0, 0);
	const installment = new Installment(1, 1000, tax);
	expect(installment.mdr).toBe(0);
});

test("Deve criar uma parcela sem MDR percentual", function () {
	const tax = new Tax("credit_card", 1, 0);
	const installment = new Installment(1, 1000, tax);
	expect(installment.mdr).toBe(10);
});