const router = require("express").Router();
const {
    getBudgetsForUser,
    createBudget,
    updateBudgetById,
    getBudgetUsageForUser,
    getBudgetChartdata,
} = require("../queries/budget");
// const router = require("./test.routes");

router.get("/budgets", async (req, res) => {
    const result = await getBudgetsForUser([res.locals.uid]);
    res.json(result);
});

router.get("/budgetChartData", async (req, res) => {
    const result = await getBudgetChartdata([res.locals.uid]);
    let labels = result.map((i) => new Date(i.month));
    labels = labels.filter(
        (date, i, self) =>
            self.findIndex((d) => d.getTime() === date.getTime()) === i
    );
    let datasetnames = result.map((i) => i.categoryname);
    datasetnames = datasetnames
        .sort()
        .filter(
            (item, i) =>
                !(
                    datasetnames[i] == datasetnames[i + 1] ||
                    datasetnames[i - 1] == datasetnames[i]
                )
        );
    let datasets = [];
    for (let i of datasetnames) {
        let datasetexp = { label: "Used: " + i };
        datasetexp.data = result
            .filter((j) => j.categoryname == i || !j.categoryname)
            .map((k) => parseFloat(k.used.slice(1)));
        datasetexp.borderColor = "rgb(0, 0, 255)";

        datasets.push(datasetexp);

        let datasetbud = { label: "Budget: " + i };
        datasetbud.data = result
            .filter((j) => j.categoryname == i || !j.categoryname)
            .map((k) => parseFloat(k.budget.slice(1)));

        datasetbud.borderColor = "rgb(255, 0, 0)";
        datasets.push(datasetbud);
    }
    console.dir({ labels, datasets });
    res.json({ labels, datasets });
});
router.post("/budgets", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await createBudget([...queryParams, res.locals.uid]);
    if (result === "Budget successfully created") {
        res.sendStatus(200, result);
    } else {
        res.sendStatus(503, result);
    }
});

router.put("/budgets/:id", async (req, res) => {
    const queryParams = Object.values(req.body);
    const result = await updateBudgetById(queryParams);
    if (result === "Transaction updated successfully") {
        res.sendStatus(200, result);
    } else {
        res.sendStatus(503, result);
    }
});

module.exports = router;
