const putBtn = document.getElementById("put-transaction");
const postBtn = document.getElementById("post-transaction");
const cancelBtn = document.getElementById("cancel");

const sendHTTP = async (url, methodType, data) => {
    if (url && data) {
        await fetch(url, {
            method: methodType,
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" },
        });
    }
};

const putTransactions = async () => {
    const id = document.getElementById("id").value;
    const desc = document.getElementById("desc");
    const am = document.getElementById("amount");

    const data = {
        userid: id,
        description: desc.value,
        amount: am.value,
    };

    await sendHTTP(`/transactions/${id}`, "PUT", data);

    window.location = "/transactions";
};

// eslint-disable-next-line no-unused-vars
const postTransactions = async () => {
    const desc = document.getElementById("desc");
    const am = document.getElementById("amount");
    const catid = document.getElementById("category");

    const data = {
        description: desc.value,
        amount: am.value,
        categoryid: catid.value,
    };

    await sendHTTP(`/transactions`, "POST", data);

    window.location = "/transactions";
};

if (putBtn) {
    putBtn.addEventListener("click", () => putTransactions());
}

if (postBtn) {
    postBtn.addEventListener("click", () => postTransactions());
}

if (cancelBtn) {
    cancelBtn.addEventListener(
        "click",
        () => (window.location = "/transactions")
    );
}
