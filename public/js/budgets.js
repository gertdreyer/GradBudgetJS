import { sendHTTP } from "js/transactions.js";

const putBtn = document.getElementById("put-budget");
const cancelBtn = document.getElementById("cancel");

const putBudgets = async () => {
    const id = document.getElementById("id").value;
    const category = document.getElementById("categoryname");
    const amount = document.getElementById("budget");
    const userid = document.getElementById("userid");

    const data = {
        usercategoryid: id,
        categoryname: category.value,
        userid: userid.value,
        budget: amount.value,
    };

    await sendHTTP(`/budgets/${id}`, "PUT", data);

    window.location = "/budgets";
};

if (putBtn) {
    putBtn.addEventListener("click", () => putBudgets());
}

if (cancelBtn) {
    cancelBtn.addEventListener(
        "click",
        () => (window.location = "/transactions")
    );
}
