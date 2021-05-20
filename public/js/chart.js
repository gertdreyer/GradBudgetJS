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
            var noBudget = document.createElement("img");
            noBudget.src = "images/NoBudget.svg";
            noBudget.classList = "no-budget";
            noBudget.alt =
                "Icon of man shrugging wondering where his money/budget is.";
            document.getElementsByTagName("main")[0].appendChild(noBudget);
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
