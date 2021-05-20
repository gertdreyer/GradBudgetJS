const postBtn = document.getElementById("post-new-budget");
const cancelBtn = document.getElementById("cancel-new-budget");

const sendHTTP = async (url, methodType, data) => {
    if (url && data) {
        console.log(data);
        await fetch(url, {
            method: methodType,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
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

if (postBtn) {
    postBtn.addEventListener("click", () => postBudget());
}

if (cancelBtn) {
    cancelBtn.addEventListener("click", () => (window.location = "/budgets"));
}
