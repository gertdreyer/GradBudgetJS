const submitBtn = document.getElementById("put-transaction");

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

const postTransactions = async () => {
    const desc = document.getElementById("desc");
    const am = document.getElementById("amount");
    const catid = document.getElementById("category");

    const data = {
        description: desc.value,
        amount: am.value,
        categoryid: catid 
    };

    await sendHTTP(`/transactions`, "POST", data);

    window.location = "/transactions";
};

submitBtn.addEventListener("click", () => putTransactions());
