const { handleError, executeQuery, getCurrentNode, getChildrenOfCurrentNode } = require("../helper/helper")

module.exports.addIncomeData = async (req, res) => {
    try {
        console.log("aaa")
        var property = req.body.property
        var incomeCategoryId = req.body.incomeCatetoryId
        var incomeCategory = req.body.incomeCategory
        var incomeDate = req.body.incomeDate
        var amount = req.body.amount
        var method = req.body.method
        var description = req.body.description
        var paidBy = req.body.paidBy
        var balance = req.body.balance

        var q_insert_category = `
                INSERT INTO incomes
                (property, income_category_id, income_category, date, amount, method, description, paid_by, balance)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
        await executeQuery(
            q_insert_category,
            [property, incomeCategoryId, incomeCategory, incomeDate, amount, method, description, paidBy, balance]
        )

        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editIncomeData = async (req, res) => {
    try {
        var incomeDataId = req.body.id
        var property = req.body.property
        var incomeCategoryId = req.body.incomeCategoryId
        var incomeCategory = req.body.incomeCategory
        var incomeDate = req.body.incomeDate
        var amount = req.body.amount
        var method = req.body.method
        var description = req.body.description
        var paidBy = req.body.paidBy
        var balance = req.body.balance

        var q_update_category_name = `
                UPDATE incomes
                SET property = ?, income_category_id = ?, income_category = ?, date = ?, amount = ?, method = ?, description = ?, paid_by = ?, balance = ? 
                WHERE id = ?
            `
        await executeQuery(
            q_update_category_name,
            [property, incomeCategoryId, incomeCategory, incomeDate, amount, method, description, paidBy, balance, incomeDataId]
        )

        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteIncomeData = async (req, res) => {
    try {
        var incomeDataId = req.query.id
        var q_delete_category = `
                DELETE FROM incomes
                WHERE id = ?
            `
        await executeQuery(
            q_delete_category,
            [incomeDataId]
        )
        
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getAllIncomeData = async (req, res) => {
    try {
        var categoryId = req.query.businessCategoryId

        var q_category_ids = `SELECT id FROM expense_categories WHERE business_category_id LIKE "%${categoryId}%"`

        var ids = await executeQuery(q_category_ids, null)

        console.log(ids.map(({id}) => {
            return id
        }))

        var idss = ids.map(({id}) => {
            return id
        })

        var idsss = '(' + idss.join(', ') + ')'

        var q_get_categories = `
            SELECT *
            FROM incomes WHERE income_category_id IN ${idsss}
        `
        var retreivedCategories = await executeQuery(
            q_get_categories, null
        )
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getIncomeData = async (req, res) => {
    try {
        var incomeDataId = req.query.id

        var q_get_categories = `
            SELECT *
            FROM incomes 
            WHERE id = ?
        `
        var retreivedCategories = await executeQuery(
            q_get_categories,
            [incomeDataId]
        )
        console.log(incomeDataId)
        console.log(retreivedCategories)
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}


//Expense
module.exports.addExpenseData = async (req, res) => {
    try {
        console.log("aaa")
        var property = req.body.property
        var expenseCategoryId = req.body.expenseCatetoryId
        var expenseCategory = req.body.expenseCategory
        var expenseDate = req.body.expenseDate
        var amount = req.body.amount
        var method = req.body.method
        var description = req.body.description
        var paidFrom = req.body.paidFrom
        var receipt = req.body.receipt
        var contractor = req.body.contractor

        var q_insert_category = `
                INSERT INTO expenses
                (property, expense_category_id, expense_category, date, amount, method, description, pay_from, receipt, contractor_vendor)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
        await executeQuery(
            q_insert_category,
            [property, expenseCategoryId, expenseCategory, expenseDate, amount, method, description, paidFrom, receipt, contractor]
        )

        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editExpenseData = async (req, res) => {
    try {
        var expenseDataId = req.body.id
        var property = req.body.property
        var expenseCategoryId = req.body.expenseCategoryId
        var expenseCategory = req.body.expenseCategory
        var expenseDate = req.body.expenseDate
        var amount = req.body.amount
        var method = req.body.method
        var description = req.body.description
        var paidFrom = req.body.paidFrom
        var receipt = req.body.receipt
        var contractor = req.body.contractor

        var q_update_category_name = `
                UPDATE expenses
                SET property = ?, expense_category_id = ?, expense_category = ?, date = ?, amount = ?, method = ?, description = ?, pay_from = ?, receipt = ?, contractor_vendor = ? 
                WHERE id = ?
            `
        await executeQuery(
            q_update_category_name,
            [property, expenseCategoryId, expenseCategory, expenseDate, amount, method, description, paidFrom, receipt, contractor, expenseDataId]
        )

        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteExpenseData = async (req, res) => {
    try {
        var expenseDataId = req.query.id
        var q_delete_category = `
                DELETE FROM expenses
                WHERE id = ?
            `
        await executeQuery(
            q_delete_category,
            [expenseDataId]
        )
        
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getAllExpenseData = async (req, res) => {
    try {
        var categoryId = req.query.businessCategoryId

        var q_category_ids = `SELECT id FROM expense_categories WHERE business_category_id LIKE "%${categoryId}%"`

        var ids = await executeQuery(q_category_ids, null)

        console.log(ids.map(({id}) => {
            return id
        }))

        var idss = ids.map(({id}) => {
            return id
        })

        var idsss = '(' + idss.join(', ') + ')'

        var q_get_categories = `
            SELECT *
            FROM expenses WHERE expense_category_id IN ${idsss}
        `
        var retreivedCategories = await executeQuery(
            q_get_categories, null
        )
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getExpenseData = async (req, res) => {
    try {
        var expenseDataId = req.query.id

        var q_get_categories = `
            SELECT *
            FROM expenses 
            WHERE id = ?
        `
        var retreivedCategories = await executeQuery(
            q_get_categories,
            [expenseDataId]
        )
        console.log(expenseDataId)
        console.log(retreivedCategories)
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}



