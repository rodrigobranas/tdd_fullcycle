import Tax from "../src/Tax";
import Transaction from "../src/Transaction";

test("Deve criar uma transação aguardando pagamento", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "boleto";
	const installments = 1;
	const tax = new Tax("boleto", 0, 5);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	const status = transaction.getStatus();
	expect(status).toBe("waiting_payment");
});

test("Deve criar uma transação no boleto à vista e fazer o pagamento", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "boleto";
	const installments = 1;
	const tax = new Tax("boleto", 0, 5);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	transaction.pay(1);
	const status = transaction.getStatus();
	expect(status).toBe("paid");
});

test("Deve criar uma transação no cartão de crédito em 4 parcelas", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "credit_card";
	const installments = 4;
	const tax = new Tax("credit_card", 1, 0);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	const [installment1, installment2, installment3, installment4] = transaction.installments;
	expect(installment1.amount).toBe(250);
	expect(installment1.status).toBe("waiting_payment");
	expect(installment2.amount).toBe(250);
	expect(installment2.status).toBe("waiting_payment");
	expect(installment3.amount).toBe(250);
	expect(installment3.status).toBe("waiting_payment");
	expect(installment4.amount).toBe(250);
	expect(installment4.status).toBe("waiting_payment");
});

test("Deve criar uma transação no cartão de crédito em 4 parcelas e pagar a primeira", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "credit_card";
	const installments = 4;
	const tax = new Tax("credit_card", 1, 0);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	transaction.pay(1);
	const [installment1, installment2, installment3, installment4] = transaction.installments;
	expect(installment1.amount).toBe(250);
	expect(installment1.status).toBe("paid");
	expect(installment2.amount).toBe(250);
	expect(installment2.status).toBe("waiting_payment");
	expect(installment3.amount).toBe(250);
	expect(installment3.status).toBe("waiting_payment");
	expect(installment4.amount).toBe(250);
	expect(installment4.status).toBe("waiting_payment");
	const balance = transaction.getBalance();
	expect(balance).toBe(750);
});

test("Deve criar uma transação no boleto à vista, fazer o pagamento e calcular o MDR (Merchant Discount Rate)", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "boleto";
	const installments = 1;
	const tax = new Tax("boleto", 0, 5);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	transaction.pay(1);
	const [installment1] = transaction.installments;
	expect(installment1.mdr).toBe(5);
});

test("Deve criar uma transação no cartão de crédito em 4 parcelas, fazer o pagamento e calcular o MDR (Merchant Discount Rate)", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "credit_card";
	const installments = 4;
	const tax = new Tax("credit_card", 1, 0);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	transaction.pay(1);
	const [installment1] = transaction.installments;
	expect(installment1.mdr).toBe(2.5);
});

test("Deve criar uma transação no cartão de crédito em 4 parcelas, fazer o pagamento e calcular o MDR (Merchant Discount Rate) variável e fixo", function () {
	const email = "rodrigo@branas.io";
	const amount = 1000;
	const paymentMethod = "credit_card";
	const installments = 4;
	const tax = new Tax("credit_card", 1, 0.50);
	const transaction = new Transaction(email, amount, paymentMethod, installments, tax);
	transaction.pay(1);
	const [installment1] = transaction.installments;
	expect(installment1.mdr).toBe(3);
});
