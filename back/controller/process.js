const { JsonWebTokenError } = require("jsonwebtoken")
const { handleError, executeQuery, getCurrentNode, getChildrenOfCurrentNode } = require("../helper/helper")
const fs = require('fs')
const path = require('path');
const pdfjsLib = require('pdfjs-dist');
// import {pdfjsLib} from 'pdfjs-dist/build/pdf.mjs'

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

//upload invoice file
module.exports.uploadInvoiceFile = async(req, res) => {
    try {
        const pdfBinaryData = req.files.file['data'];
        fs.writeFileSync('tmp.pdf', pdfBinaryData, 'binary', (err) => {
            console.log(err)
        })
        const loadingTask = pdfjsLib.getDocument('./tmp.pdf')
        var stringArray = [];
        loadingTask.promise.then(function(doc) {
            const numPages = doc.numPages;

            let lastPromise;
            lastPromise = doc.getMetadata().then(function(data) {
                if (data.metadata) {
                    console.log('## Metadata');
                    console.log(JSON.stringify(data.metadata.getAll(), null, 2));
                    console.log();
                }
            });
        
            let loadPage = function(pageNum) {
                return doc.getPage(pageNum).then(function (page) {
                    // console.log('# Page ' + pageNum);
                    let viewport = page.getViewport({ scale: 1.0 });
                    // console.log(viewport);
                    // console.log('Size: ' + viewport.width + 'x' + viewport.height);
                    // console.log();
                    return page.getTextContent().then(function (content) {
                        // Content contains lots of information about the text layout and
                        // styles, but we need only strings at the moment
                        let strings = content.items.map(function (item) { 
                            return item.str;
                        });
                        // console.log('## Text Content');
                        // console.log(strings.join('\n'));
                        stringArray = stringArray.concat(strings);
                    }).then(function () {
                        console.log();
                    });
                });
            };
        
            // Loading of the first page will wait on metadata and subsequent loadings
            // will wait on the previous pages.
            for (let i = 1; i <= numPages; i++) {
                lastPromise = lastPromise.then(loadPage.bind(null, i));
            }
        
            return lastPromise;
        }).then(function () {
            var index = 0, k = 0;
            var len = stringArray.length;
            var regxDate = new RegExp(/^\d\d\/\d\d/);
            var regxEnds = new RegExp(/\.\d{2}$/);
            var year;
            for (index = 0; index < len; index++) {
                var current = stringArray[index];
                var tmpArray = [current];
                //Find Year
                if (current == 'through') {
                    var tmp = stringArray[index + 1];
                    tmp = parseInt(tmp.split(',')[1]);
                    year = tmp;
                    index++;
                    continue;
                }
                //Find First Date
                if (regxDate.test(current)) {
                    //Till Last Date
                    for (k = index + 1; k < len; k++) {
                        if (regxEnds.test(stringArray[k])) {
                            tmpArray.push(stringArray[k]);
                            console.log(tmpArray);
                            index = k - 1;
                            break;
                        }
                        tmpArray.push(stringArray[k])
                    }
                }
            }
        }, function (err) {
            console.error('Error: ' + err);
        });

        var stream = fs.createReadStream('tmp.pdf');
        stream.pipe(res).once("close", function() {
            stream.close();
            fs.unlink('tmp.pdf', function(){})
        })

    } catch(err) {
        handleError(err, res)
    }
}

//add property from process
module.exports.addPrpoertyFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var categoryId = req.query.categoryId
        var propertyName = req.query.propertyName
        var q_get_category_children = `
            SELECT children
            FROM business_categories 
            WHERE id = ?
        `
        var retreivedCategoryChild = await executeQuery(
            q_get_category_children,
            [categoryId]
        )
        children = JSON.parse(retreivedCategoryChild[0]['children'])
        lastID = children.at(-1)['id'].split('-')
        currentID = lastID[0] + '-' + (parseInt(lastID[1]) + 1)
        newChild = {
            id: currentID,
            name: propertyName,
            children: []
        }
        children.push(newChild)
        children = JSON.stringify(children)
        var q_update_category_children = `
            UPDATE business_categories
            SET children = ?
            where id = ?
        `
        await executeQuery(
            q_update_category_children,
            [children, currentID]
        )
        console.log(currentID)
        res.status(200).json({id: currentID})
    } catch(err) {
        console.log(err)
        handleError(err, res)
    }
}

module.exports.addIncomeCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var incomeCategoryId = req.query.business_category_id
        console.log(incomeCategoryId)
        var incomeCategoryType = req.query.type
        var incomeCategoryName = req.query.name
        var q_insert_expense_category = `
                INSERT INTO expense_categories
                (user_id, business_category_id, name, type, children)
                VALUES (?, ?, ?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, incomeCategoryId, incomeCategoryName, incomeCategoryType, '[]']
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}