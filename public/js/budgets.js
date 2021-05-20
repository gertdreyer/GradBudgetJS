const putBtn = document.getElementById("put-budget");
const cancelPutBtn = document.getElementById("cancel");
const postBtn = document.getElementById("post-new-budget");
const cancelBtn = document.getElementById("cancel-new-budget");

const sendHTTP = async (url, methodType, data) => {
    if (url && data) {
        await fetch(url, {
            method: methodType,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
};

const putBudgets = async () => {
    const id = document.getElementById("id").value;
    const category = document.getElementById("categoryname");
    const amount = document.getElementById("budget");

    const data = {
        usercategoryid: id,
        categoryname: category.value,
        budget: amount.value,
    };

    await sendHTTP(`/budgets/${id}`, "PUT", data);

    window.location = "/budgets";
};

// eslint-disable-next-line no-unused-vars
const postBudget = async () => {
    const name = document.getElementById("name");
    const amount = document.getElementById("amount");

    const data = {
        categoryname: name.value,
        budget: amount.value,
    };

    await sendHTTP(`/budgets`, "POST", data);

    window.location = "/budgets";
};

if (putBtn) {
    putBtn.addEventListener("click", () => putBudgets());
}

if (postBtn) {
    postBtn.addEventListener("click", () => postBudget());
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => (window.location = "/budgets"));
}

if (cancelPutBtn) {
    cancelPutBtn.addEventListener(
        "click",
        () => (window.location = "/budgets")
    );
}
