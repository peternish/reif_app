const { JsonWebTokenError } = require("jsonwebtoken")
const { handleError, executeQuery, getCurrentNode, getChildrenOfCurrentNode } = require("../helper/helper")
const stringSimilarity = require("string-similarity")
const fs = require('fs')
const path = require('path');
const pdfjsLib = require('pdfjs-dist');
// import {pdfjsLib} from 'pdfjs-dist/build/pdf.mjs'

module.exports.addIncomeData = async (req, res) => {
    try {
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
        var q_get_categories = `
            SELECT
            incomes.id As id,
            customer_categories.name As property,
            incomes.date As date,
            expense_categories.name As income_category,
            incomes.amount As amount,
            payment_method_categories.name As method,
            description_categories.name As description,
            pay_from_account_categories.name As paid_by,
            incomes.balance As balance
            FROM incomes
            LEFT JOIN config ON incomes.config_id = config.id
            LEFT JOIN expense_categories ON config.expense_category_id = expense_categories.id
            LEFT JOIN customer_categories ON config.customer_category_id = customer_categories.id
            LEFT JOIN vendor_categories ON config.vendor_category_id = vendor_categories.id
            LEFT JOIN description_categories ON config.description_category_id = description_categories.id
            LEFT JOIN payment_method_categories ON config.payment_method_category_id = payment_method_categories.id
            LEFT JOIN pay_from_account_categories ON config.pay_from_account_category_id = pay_from_account_categories.id
            LEFT JOIN business_categories ON config.business_category_id = business_categories.id
            WHERE config.business_category_id = ?
        `
        var retreivedCategories = await executeQuery(
            q_get_categories, [categoryId]
        )
        res.status(200).json(retreivedCategories)
        // var q_category_ids = `SELECT id FROM expense_categories WHERE business_category_id LIKE "%${categoryId}%"`
        // var ids = await executeQuery(q_category_ids, null)
        // if (ids == []) {
        //     res.status(200).json([])
        // }

        // var idss = ids.map(({id}) => {
        //     return id
        // })
        // console.log(idss)
        // if (idss.length == 0)
        //     res.status(200).json({})
        // else {
        //     var idsss = '(' + idss.join(', ') + ')'

        //     var q_get_categories = `
        //         SELECT *
        //         FROM incomes WHERE income_category_id IN ${idsss}
        //     `
        //     console.log(q_get_categories + "dkfhdlfdjhflajhfdl")
        //     var retreivedCategories = await executeQuery(
        //         q_get_categories, null
        //     )
        //     res.status(200).json(retreivedCategories)
        // }
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
        // console.log(incomeDataId)
        // console.log(retreivedCategories)
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}

//Expense
module.exports.addExpenseData = async (req, res) => {
    try {
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
        var q_get_categories = `
            SELECT
            expenses.id As id,
            customer_categories.name As property,
            expenses.date As date,
            expense_categories.name As expense_category,
            expenses.amount As amount,
            vendor_categories.name As contractor_vendor,
            payment_method_categories.name As method,
            description_categories.name As description,
            pay_from_account_categories.name As pay_from,
            expenses.receipt As receipt
            FROM expenses
            LEFT JOIN config ON expenses.config_id = config.id
            LEFT JOIN expense_categories ON config.expense_category_id = expense_categories.id
            LEFT JOIN customer_categories ON config.customer_category_id = customer_categories.id
            LEFT JOIN vendor_categories ON config.vendor_category_id = vendor_categories.id
            LEFT JOIN description_categories ON config.description_category_id = description_categories.id
            LEFT JOIN payment_method_categories ON config.payment_method_category_id = payment_method_categories.id
            LEFT JOIN pay_from_account_categories ON config.pay_from_account_category_id = pay_from_account_categories.id
            LEFT JOIN business_categories ON config.business_category_id = business_categories.id
            WHERE config.business_category_id = ?
        `
        var retreivedCategories = await executeQuery(
            q_get_categories, [categoryId]
        )
        res.status(200).json(retreivedCategories)
        // var q_category_ids = `SELECT id FROM expense_categories WHERE business_category_id LIKE "%${categoryId}%"`

        // var ids = await executeQuery(q_category_ids, null)

        // console.log(ids.map(({id}) => {
        //     return id
        // }))

        // var idss = ids.map(({id}) => {
        //     return id
        // })

        // var idsss = '(' + idss.join(', ') + ')'        
        // if (idss.length == 0) {
        //     res.status(200).json({})    
        // }
        // else {
        //     var q_get_categories = `
        //         SELECT *
        //         FROM expenses WHERE expense_category_id IN ${idsss}
        //     `
        //     var retreivedCategories = await executeQuery(
        //         q_get_categories, null
        //     )
        //     res.status(200).json(retreivedCategories)
        // }
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
        // console.log(expenseDataId)
        // console.log(retreivedCategories)
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}

//upload invoice file
module.exports.uploadInvoiceFile = async(req, res) => {
    try {
        var userId = req.userId
        var invoiceData = [];
        var q_get_all_config_data = `
            SELECT config.*, expense_categories.type As type
            FROM config
            LEFT JOIN expense_categories ON config.expense_category_id = expense_categories.id
        `
        var allConfigData = await executeQuery(
            q_get_all_config_data
        )
        const pdfBinaryData = req.files.file['data'];
        const pdfFileName = req.files.file['name'];
        var categoryId = req.body.categoryId
        fs.writeFileSync('tmp.pdf', pdfBinaryData, 'binary', (err) => {
            console.log(err)
        })
        const loadingTask = pdfjsLib.getDocument('./tmp.pdf')
        var stringArray = [];
        await loadingTask.promise.then(function(doc) {
            const numPages = doc.numPages;

            let lastPromise;
            lastPromise = doc.getMetadata().then(function(data) {
                if (data.metadata) {
                    // console.log('## Metadata');
                    // console.log(JSON.stringify(data.metadata.getAll(), null, 2));
                    // console.log();
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
                    });
                });
            };
        
            // Loading of the first page will wait on metadata and subsequent loadings
            // will wait on the previous pages.
            for (let i = 1; i <= numPages; i++) {
                lastPromise = lastPromise.then(loadPage.bind(null, i));
            }
        
            return lastPromise;
        }).then(async function () {
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

                if (regxDate.test(current)) {
                    //Till Last Date
                    var dt = '';
                    for (k = 1; k < len - index; k++) {
                        if (regxEnds.test(stringArray[index + k])) {
                            tmpArray.push(dt);
                            tmpArray.push(stringArray[index + k]);
                            index += k - 1;
                            break;
                        }
                        dt += stringArray[index + k]
                    }
                    var checkedData = allConfigData.filter((item) => {
                        // return item['name'] == tmpArray[1]
                        return stringSimilarity.compareTwoStrings(item['name'], tmpArray[1]) > 0.7
                    })
                    if (checkedData.length > 0) {
                        var checkData = checkedData[0];
                        var q_insert_data = ``;
                        var ch = {
                            'date': new Date(year, parseInt(tmpArray[0].split('/')[0])-1, parseInt(tmpArray[0].split('/')[1])),
                            'amount': tmpArray[2][0] == '$' ? parseFloat(tmpArray[2].substring(1).replace(/,/g, '')) : parseFloat(tmpArray[2].replace(/,/g, '')),
                            'config_id': checkData['id']
                        }

                        if (checkData['type'] == 'income') {
                            q_insert_data = `
                                INSERT INTO incomes
                                (date, amount, config_id, user_id)
                                VALUES (?, ?, ?, ?)
                            `
                        }
                        else {
                            q_insert_data = `
                                INSERT INTO expenses
                                (date, amount, config_id, user_id)
                                VALUES (?, ?, ?, ?)
                            `
                        }
                        await executeQuery(
                            q_insert_data,
                            [ch['date'], ch['amount'], ch['config_id'], req.userId]
                        )
                    }
                    else
                        if (tmpArray[1] != '') {
                            tmpArray.push(year)
                            invoiceData.push(tmpArray);
                        }
                }
            }
            // var q_insert_income_data = `
            //     INSERT INTO incomes (property, income_category_id, date, amount, method, description, paid_by, balance, income_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
            // var q_insert_expense_data = `INSERT INTO expenses (property, expense_category_id, amount, date, method, description, pay_from, receipt, contractor_vendor, expense_category) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        
            // for (var i = 0 ; i < invoiceData.length; i++) {
            //     let current = invoiceData[i];
                
            //     if (current[1].startsWith('Orig CO Name:') != false) {
                    
            //         if (current[1].indexOf('Graylan') != -1) {
            //             var ch = {
            //                 'property': current[1].substring(13, current[1].indexOf('Orig ID:')),
            //                 'income_category_id': categoryId,
            //                 'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //                 'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //                 'method': 'Wire transfer',
            //                 'description': current[1].substring(current[1].indexOf('Descr:') + 6, current[1].indexOf('Sec')),
            //                 'paid_by': current[1].substring(current[1].indexOf('Ind Name:') + 9, current[1].indexOf('Trn')),
            //                 'balance': ' ',
            //                 'income_category': current[1].substring(13, current[1].indexOf('Orig ID:'))
            //             }
            //             executeQuery(
            //                 q_insert_income_data,
            //                 [ch.property, ch.income_category_id, ch.date, ch.amount, ch.method, ch.description, ch.paid_by, ch.balance, ch.income_category]
            //             )
            //         continue;
            //         }
            //         else {
            //             var ch = {
            //                 'property': current[1].substring(13, current[1].indexOf('Orig ID:')),
            //                 'expense_category_id': categoryId,
            //                 'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //                 'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //                 'method': 'Wire transfer',
            //                 'description': current[1].substring(current[1].indexOf('Descr:') + 6, current[1].indexOf('Sec')),
            //                 'paid_by': current[1].substring(current[1].indexOf('Ind Name:') + 9, current[1].indexOf('Trn')),
            //                 'contractor_vendor': ' ',
            //                 'receipt': ' ',
            //                 'income_category': current[1].substring(13, current[1].indexOf('Orig ID:'))
            //             }
            //             executeQuery(
            //                 q_insert_expense_data,
            //                 [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.balance, ch.income_category]
            //             )
            //         }
            //         continue;
            //     }
            //     if (current[1].startsWith('Deposit') != false) {
            //         var ch = {
            //             'property': 'Deposits',
            //             'income_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Wire transfer',
            //             'description': 'Deposit',
            //             'paid_by': 'Stewart Marketing, LLC',
            //             'balance': ' ',
            //             'income_category': 'monthly business'
            //         }
            //         executeQuery(
            //             q_insert_income_data,
            //             [ch.property, ch.income_category_id, ch.date, ch.amount, ch.method, ch.description, ch.paid_by, ch.balance, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].startsWith('Card Purchase')) {
            //         var ch = {
            //             'property': 'PurChase',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Card',
            //             'description': 'Card Purchase',
            //             'pay_from': current[1].split(' ')[3],
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Purchage'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].startsWith('Recurring Card Purchase')) {
            //         var ch = {
            //             'property': 'Purse',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Card',
            //             'description': 'Recurring Card Purchase',
            //             'pay_from': current[1].split(' ')[4],
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Purchage'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].startsWith('Non-Chase')) {
            //         var ch = {
            //             'property': 'Chase',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Card',
            //             'description': 'Non-Chase ATM Withdraw',
            //             'pay_from': current[1].split(' ')[4],
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Chase'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].startsWith('Payment Sent')) {
            //         var ch = {
            //             'property': 'Chase',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Card',
            //             'description': 'Non-Chase ATM Withdraw',
            //             'pay_from': current[1].split(' ')[4],
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Cash'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].indexOf('Zelle') != -1) {
            //         var ch = {
            //             'property': 'Quickpay',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Zelle',
            //             'description': 'Zelle Payment',
            //             'pay_from': ' ',
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Quickpay'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].indexOf('ACH') != -1) {
            //         var ch = {
            //             'property': 'Chase',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'ACH',
            //             'description': 'Online ACH Payment',
            //             'pay_from': '',
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'ACH'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].indexOf('Basic Online Payroll Payment') != -1) {
            //         var ch = {
            //             'property': 'Online Payroll',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Online Payroll',
            //             'description': 'Payroll',
            //             'pay_from': '',
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Payroll'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            //     if (current[1].indexOf('Online Payment') != -1) {
            //         var ch = {
            //             'property': 'Online Payment',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Online',
            //             'description': 'Online Payment',
            //             'pay_from': '',
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Chase'
            //         }
            //         continue;
            //     }
            //     if (current[1].indexOf('Fee') != -1) {
            //         var ch = {
            //             'property': 'Fee',
            //             'expense_category_id': categoryId,
            //             'amount': current[2][0] == '$' ? parseFloat(current[2].substring(1).replace(/,/g, '')) : parseFloat(current[2].replace(/,/g, '')),
            //             'date': new Date(year, parseInt(current[0].split('/')[0])-1, parseInt(current[0].split('/')[1])),
            //             'method': 'Fee',
            //             'description': 'Fee',
            //             'pay_from': current[1].split(' ')[4],
            //             'receipt': ' ',
            //             'contractor_vendor': ' ',
            //             'expense_category': 'Chase'
            //         }
            //         executeQuery(
            //             q_insert_expense_data,
            //             [ch.property, ch.expense_category_id, ch.amount, ch.date, ch.method, ch.description, ch.pay_from, ch.receipt, ch.contractor_vendor, ch.income_category]
            //         )
            //         continue;
            //     }
            // }
            // console.log(invoiceData)
        }, function (err) {
            console.error('Error: ' + err);
        });


        var q_get_categories = `
            SELECT id, name
            FROM business_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var business_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id, type
            FROM expense_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var expense_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM customer_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var customer_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM vendor_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var vendor_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM description_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var description_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM payment_method_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var payment_method_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM pay_from_account_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var pay_from_account_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        var q_imported_file = `
            INSERT INTO imported_data
            (file_name, original_data, extra_data, user_id)
            VALUES (?, ?, ?, ?)
        `
        var imported_file = await executeQuery(
            q_imported_file,
            [pdfFileName, JSON.stringify(invoiceData), JSON.stringify(invoiceData), userId]
        )
        
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var imported_file_query = await executeQuery(
            q_get_last_id
        )
        var imported_file_id = imported_file_query[0]['LAST_INSERT_ID()']

        res.status(200).json({
            'importedFileID': imported_file_id,
            'invoiceData': invoiceData, 
            'businessCategory': business_category,
            'expenseCategory': expense_category,
            'customerCategory': customer_category,
            'vendorCategory': vendor_category,
            'descriptionCategory': description_category,
            'pMethodCategory': payment_method_category,
            'pAccountCategory': pay_from_account_category,
            'data': true})
    } catch(err) {
        handleError(err, res)
    }
}


//add property from process
module.exports.addConfig = async(req, res) => {
    try {
        var userId = req.userId
        var importedFileID = req.body.importedFileID
        var textItem = req.body.textItem
        var businessCategoryId = req.body.businessCategoryId
        var invoiceType = req.body.invoiceType
        var expenseCategoryId = req.body.expenseCategoryId
        var customerCategoryId = req.body.customerCategoryId
        var vendorCategoryId = req.body.vendorCategoryId
        var descriptionCategoryId = req.body.descriptionCategoryId
        var pMethodCategoryId = req.body.pMethodCategoryId
        var pAccountCategoryId = req.body.pAccountCategoryId
        
        var q_insret_config = `
            INSERT INTO config
            (expense_category_id, vendor_category_id, description_category_id, payment_method_category_id, pay_from_account_category_id, business_category_id, customer_category_id, name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `
        await executeQuery(
            q_insret_config,
            [expenseCategoryId, vendorCategoryId, descriptionCategoryId, pMethodCategoryId, pAccountCategoryId, businessCategoryId, customerCategoryId, textItem[1]]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']


        //add incomes/expenses
        var q_business_category = `
            SELECT * FROM business_categories WHERE id = ${returnData} 
        `
        businessCategory = await executeQuery(q_business_category)
        var ch = {
            'date': new Date(textItem[3], parseInt(textItem[0].split('/')[0])-1, parseInt(textItem[0].split('/')[1])),
            'amount': textItem[2][0] == '$' ? parseFloat(textItem[2].substring(1).replace(/,/g, '')) : parseFloat(textItem[2].replace(/,/g, '')),
            'config_id': returnData
        }
        console.log(ch['date'])
        if (invoiceType =='Deposit') {
            var q_incomes = `
                INSERT INTO incomes
                (date, amount, config_id, user_id)
                VALUES (?, ?, ?, ?)
            `
            await executeQuery(
                q_incomes,
                [ch['date'], ch['amount'], ch['config_id'], req.userId]
            )
        }
        else {
            var q_incomes = `
            INSERT INTO expenses
            (date, amount, config_id, user_id)
            VALUES (?, ?, ?, ?)
        `
        await executeQuery(
            q_incomes,
            [ch['date'], ch['amount'], ch['config_id'], req.userId]
        )
        }

        var imported_file = `
            SELECT extra_data FROM imported_data WHERE id = ${importedFileID}
        `
        var extra_data = await executeQuery(
            imported_file
        )
        extra_data = extra_data[0]['extra_data']
        extra_data = JSON.parse(extra_data)
        var filtered_extra_data = extra_data.filter((u) => !(u[0] == textItem[0] && u[1] == textItem[1] && u[2] == textItem[2] && u[3] == textItem[3]))
        console.log(filtered_extra_data.length)
        extra_data = JSON.stringify(filtered_extra_data)

        var q_update_imported = `UPDATE imported_data SET extra_data = ? WHERE id = ?`
        await executeQuery(q_update_imported, [extra_data, importedFileID])
        
        res.status(200).json({'id': returnData, 'invoiceType': invoiceType, 'data': true})
    } catch(err) {
        console.log(err)
        handleError(err, res)
    }
}

//Add similiar config
module.exports.addSimiliarConfig = async(req, res) => {
    try {
        var similiarInvoice = req.body.similiarInvoice
        var id = req.body.id
        var invoiceType = req.body.invoiceType
        var importedFileID = req.body.importedFileID
        console.log(importedFileID)
        //add incomes/expenses
        var q_business_category = `
            SELECT * FROM business_categories WHERE id = ${id}
        `
        businessCategory = await executeQuery(q_business_category)
        var q_extra_data = `SELECT extra_data FROM imported_data WHERE id = ?`
        var extra_data = await executeQuery(q_extra_data, [importedFileID])
        extra_data = extra_data[0]['extra_data']
        var filtered_extra_data = JSON.parse(extra_data)

        similiarInvoice.map((textItem) => {
            var ch = {
                'date': new Date(textItem[3], parseInt(textItem[0].split('/')[0])-1, parseInt(textItem[0].split('/')[1])),
                'amount': textItem[2][0] == '$' ? parseFloat(textItem[2].substring(1).replace(/,/g, '')) : parseFloat(textItem[2].replace(/,/g, '')),
                'config_id': id
            }
            if (invoiceType =='Deposit') {
                var q_incomes = `
                    INSERT INTO incomes
                    (date, amount, config_id, user_id)
                    VALUES (?, ?, ?, ?)
                `
                executeQuery(
                    q_incomes,
                    [ch['date'], ch['amount'], ch['config_id'], req.userId]
                )
            }
            else {
                var q_incomes = `
                INSERT INTO expenses
                (date, amount, config_id, user_id)
                VALUES (?, ?, ?, ?)
            `
                executeQuery(
                q_incomes,
                [ch['date'], ch['amount'], ch['config_id'], req.userId]
            )
            }
            filtered_extra_data = filtered_extra_data.filter((u) => !(u[0] == textItem[0] && u[1] == textItem[1] && u[2] == textItem[2] && u[3] == textItem[3]))
        })
        extra_data = JSON.stringify(filtered_extra_data)
        var q_update_imported = `UPDATE imported_data SET extra_data = ? WHERE id = ?`
        await executeQuery(q_update_imported, [extra_data, importedFileID])

        res.status(200).json({'data': true})
    } catch(err) {
        console.log(err)
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
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.addBusinessCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var businessCategoryName = req.query.name
        var q_insert_expense_category = `
                INSERT INTO business_categories
                (user_id, name, children)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, businessCategoryName, '[]']
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.addExpenseCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId
        var type = req.query.type == 'Expense' ? 'expense' : 'income'
        console.log(type)
        var q_insert_expense_category = `
                INSERT INTO expense_categories
                (user_id, name, business_category_id, type, children)
                VALUES (?, ?, ?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId, type, '[]']
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}
module.exports.addCustomerCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId

        var q_insert_expense_category = `
                INSERT INTO customer_categories
                (user_id, name, business_category_id)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}


module.exports.addVendorCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId

        var q_insert_expense_category = `
                INSERT INTO vendor_categories
                (user_id, name, business_category_id)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.addDescriptionCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId

        var q_insert_expense_category = `
                INSERT INTO description_categories
                (user_id, name, business_category_id)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.addVendorCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId

        var q_insert_expense_category = `
                INSERT INTO vendor_categories
                (user_id, name, business_category_id)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.addPAccountCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId

        var q_insert_expense_category = `
                INSERT INTO pay_from_account_categories
                (user_id, name, business_category_id)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.addPMethodCategoryFromProcess = async(req, res) => {
    try {
        var userId = req.userId
        var name = req.query.name
        var businessCategoryId = req.query.businessCategoryId

        var q_insert_expense_category = `
                INSERT INTO payment_method_categories
                (user_id, name, business_category_id)
                VALUES (?, ?, ?)
            `
        await executeQuery(
            q_insert_expense_category,
            [userId, name, businessCategoryId]
        )
        var q_get_last_id = `
            SELECT LAST_INSERT_ID()
        `
        var returnData = await executeQuery(
            q_get_last_id
        )
        returnData = returnData[0]['LAST_INSERT_ID()']
        res.status(200).json({id: returnData})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.getFileList = async(req, res) => {
    try {
        var userId = req.userId
        var q_file_list = `
                SELECT id, file_name, extra_data FROM imported_data WHERE user_id = ?
            `
        var data = await executeQuery(
            q_file_list,
            [userId]
        )
        res.status(200).json({'data':data})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}

module.exports.getAllCategories = async(req, res) => {
    try {
        var userId = req.userId
        var q_get_categories = `
            SELECT id, name
            FROM business_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var business_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id, type
            FROM expense_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var expense_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM customer_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var customer_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM vendor_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var vendor_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM description_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var description_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM payment_method_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var payment_method_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        q_get_categories = `
            SELECT id, name, business_category_id
            FROM pay_from_account_categories
            WHERE user_id = ?
            ORDER BY name ASC
        `
        var pay_from_account_category = await executeQuery(
            q_get_categories,
            [userId]
        )

        res.status(200).json({
            'businessCategory': business_category,
            'expenseCategory': expense_category,
            'customerCategory': customer_category,
            'vendorCategory': vendor_category,
            'descriptionCategory': description_category,
            'pMethodCategory': payment_method_category,
            'pAccountCategory': pay_from_account_category,
            'data': true})
        // console.log(returnData)
    } catch(error) {
        handleError(error, res)
    }
}