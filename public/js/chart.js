let data = {};

const sendHTTP = async (url, methodType, data) => {
    if (!!url && (!!data || methodType == "GET")) {
        return await fetch(url, {
            method: methodType,
            body: methodType != "GET" ? JSON.stringify(data) : undefined,
            headers: { "Content-Type": "application/json" },
        });
    }
    return false;
};

sendHTTP("/budgetChartData", "GET", true).then((res) => {
    res.json().then((res1) => {
        if (res1.datasets.length === 0) {
            const noBudgetImg = document.createElement("img");
            noBudgetImg.src = "images/NoBudget.svg";
            noBudgetImg.classList = "no-budget";
            noBudgetImg.alt =
                "Icon of man shrugging wondering where his money/budget is.";
            const noBudgetTxt = document.createElement("h2");
            noBudgetTxt.classList = "no-budget-text";
            noBudgetTxt.innerHTML =
                "No budgets found... Try adding some. Do it for the bird.";
            document.getElementsByTagName("main")[0].appendChild(noBudgetImg);
            document.getElementsByTagName("main")[0].appendChild(noBudgetTxt);
        }
        data = res1;
        const config = {
            type: "line",
            data,
            option: {},
        };
        // eslint-disable-next-line
        const budgetchart = new Chart(
            document.getElementById("budgetchart"),
            config
        );
    });
});
