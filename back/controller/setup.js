const { handleError, executeQuery, getCurrentNode, getChildrenOfCurrentNode } = require("../helper/helper")

var q_get_business_category_with_node_id = `
    SELECT children
    FROM business_categories
    WHERE id = ?
`
var q_get_expense_category_with_node_id = `
    SELECT children
    FROM expense_categories
    WHERE id = ?
`
var q_update_category = `
    UPDATE business_categories
    SET children = ?
    WHERE id = ?
`
var q_update_expense_category = `
    UPDATE expense_categories
    SET children = ?
    WHERE id = ?
`

module.exports.addBusinessCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var parent = req.body.parent

        if (parent == 0) { // create main category

            var q_insert_category = `
                INSERT INTO business_categories
                (user_id, name, children)
                VALUES (?, ?, ?)
            `

            await executeQuery(
                q_insert_category,
                [userId, name, `[]`]
            )
        }
        else { // create sub category
            var nodeIdArr = parent.split('-');
            var retreivedCategory = await executeQuery(
                q_get_business_category_with_node_id,
                [nodeIdArr[0]]
            )
            var childrenData = JSON.parse(retreivedCategory[0].children);
            if (nodeIdArr.slice(1) == []) { // which means the parent is the root node - main business category.
                let idOfLastNode = childrenData[0] ? childrenData[childrenData.length - 1]['id'] : '0'
                let idToBeAdded = parseInt(idOfLastNode[idOfLastNode.length - 1]) + 1
                childrenData.push({
                    id: `${retreivedCategory[0].id}-${idToBeAdded}`,
                    name: name,
                    children: []
                })
            }
            else { // parent node is not the main category
                let chidrenOfCurrentNode = getChildrenOfCurrentNode(nodeIdArr, childrenData);
                let idOfLastNode = chidrenOfCurrentNode[0] ? chidrenOfCurrentNode[chidrenOfCurrentNode.length - 1]['id'] : '0'
                let idToBeAdded = parseInt(idOfLastNode[idOfLastNode.length - 1]) + 1
                chidrenOfCurrentNode = chidrenOfCurrentNode.push({
                    id: parent + `-${idToBeAdded}`,
                    name: name,
                    children: []
                });
            }
            childrenData = JSON.stringify(childrenData)
            await executeQuery(
                q_update_category,
                [childrenData, nodeIdArr[0]]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editBusinessCategory = async (req, res) => {
    try {
        var nodeId = req.body.nodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]

        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_category_name = `
                UPDATE business_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_category_name,
                [name, id]
            )
        }
        else { // change the name of sub category
            var retreivedCategory = await executeQuery(
                q_get_expense_category_with_node_id,
                [id]
            )
            var childrenData = JSON.parse(retreivedCategory[0].children);
            var node = getCurrentNode(nodeIdArr, childrenData)
            node['name'] = name
            childrenData = JSON.stringify(childrenData)
            await executeQuery(
                q_update_category,
                [childrenData, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteBusinessCategory = async (req, res) => {
    try {
        var nodeId = req.query.nodeId
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM business_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        else {  // in case of sub category
            var retreivedCategory = await executeQuery(
                q_get_business_category_with_node_id,
                [id]
            );
            var childrenData = JSON.parse(retreivedCategory[0].children);
            var parentNode;
            if (nodeIdArr.length === 2) { // the parent node is the main category
                parentNode = {
                    ...retreivedCategory[0],
                    children: JSON.parse(retreivedCategory[0].children)
                };
                parentNode.children = parentNode.children.filter(child => child.id !== nodeId);
                childrenData = JSON.stringify(parentNode.children);
            } else {
                parentNode = getCurrentNode(nodeIdArr.slice(0, nodeIdArr.length - 1), childrenData);
                parentNode.children = parentNode.children.filter(child => child.id !== nodeId);
                childrenData = JSON.stringify(childrenData);
            }
            await executeQuery(
                q_update_category,
                [childrenData, id]
            )
        }
        // delete related expense/income
        var q_delete_expense_by_category_id = `
            DELETE FROM expense_categories
            WHERE business_category_id LIKE ?
        `
        await executeQuery(
            q_delete_expense_by_category_id,
            [`${nodeId}%`]
        )
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getBusinessCategory = async (req, res) => {
    try {
        var userId = req.userId
        var q_get_categories = `
            SELECT id, name, children
            FROM business_categories
            WHERE user_id = ?
        `
        var retreivedCategories = await executeQuery(
            q_get_categories,
            [userId]
        )
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addExpenseCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var type = req.body.type
        var parent = req.body.parent
        var categoryNodeId = req.body.categoryNodeId

        if (parent == 0) { // add main expense category
            var q_insert_expense = `
                INSERT INTO expense_categories
                (user_id, business_category_id, name, type, children)
                VALUES (?, ?, ?, ?, ?)
            `
            await executeQuery(
                q_insert_expense,
                [userId, categoryNodeId, name, type, `[]`]
            )
        }
        else {
            var nodeIdArr = parent.split('-')
            var retreivedCategory = await executeQuery(
                q_get_expense_category_with_node_id,
                [nodeIdArr[0]]
            )
            var childrenData = JSON.parse(retreivedCategory[0].children);
            if (nodeIdArr.slice(1) == []) { // which means the parent is the root node - main business category.
                let idOfLastNode = childrenData[0] ? childrenData[childrenData.length - 1]['id'] : '0'
                let idToBeAdded = parseInt(idOfLastNode[idOfLastNode.length - 1]) + 1
                childrenData.push({
                    id: `${retreivedCategory[0].id}-${idToBeAdded}`,
                    name: name,
                    children: []
                })
            }
            else { // parent node is not the main category
                let chidrenOfCurrentNode = getChildrenOfCurrentNode(nodeIdArr, childrenData);
                let idOfLastNode = chidrenOfCurrentNode[0] ? chidrenOfCurrentNode[chidrenOfCurrentNode.length - 1]['id'] : '0'
                let idToBeAdded = parseInt(idOfLastNode[idOfLastNode.length - 1]) + 1
                chidrenOfCurrentNode = chidrenOfCurrentNode.push({
                    id: parent + `-${idToBeAdded}`,
                    name: name,
                    children: []
                });
            }
            childrenData = JSON.stringify(childrenData)
            await executeQuery(
                q_update_expense_category,
                [childrenData, nodeIdArr[0]]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editExpenseCategory = async (req, res) => {
    try {
        var nodeId = req.body.expenseNodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_category_name = `
                UPDATE expense_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_category_name,
                [name, id]
            )
        }
        else { // change the name of sub category
            var retreivedCategory = await executeQuery(
                q_get_expense_category_with_node_id,
                [id]
            )
            var childrenData = JSON.parse(retreivedCategory[0].children);
            var node = getCurrentNode(nodeIdArr, childrenData)
            node['name'] = name
            childrenData = JSON.stringify(childrenData)
            await executeQuery(
                q_update_expense_category,
                [childrenData, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteExpenseCategory = async (req, res) => {
    try {
        var nodeId = req.query.nodeId
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM expense_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        else {  // in case of sub category
            var retreivedCategory = await executeQuery(
                q_get_expense_category_with_node_id,
                [id]
            );
            var childrenData = JSON.parse(retreivedCategory[0].children);
            var parentNode;
            if (nodeIdArr.length === 2) { // the parent node is the main category
                parentNode = {
                    ...retreivedCategory[0],
                    children: JSON.parse(retreivedCategory[0].children)
                };
                parentNode.children = parentNode.children.filter(child => child.id !== nodeId);
                childrenData = JSON.stringify(parentNode.children);
            } else {
                parentNode = getCurrentNode(nodeIdArr.slice(0, nodeIdArr.length - 1), childrenData);
                parentNode.children = parentNode.children.filter(child => child.id !== nodeId);
                childrenData = JSON.stringify(childrenData);
            }
            await executeQuery(
                q_update_expense_category,
                [childrenData, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}

module.exports.getExpenseCategory = async (req, res) => {
    try {
        var userId = req.userId
        var businessCategoryId = req.query.businessCategoryId
        var q_get_expense_categories = `
            SELECT id, name, children, type
            FROM expense_categories
            WHERE user_id = ? AND business_category_id = ?
            ORDER BY type
        `
        var retreivedExpenses = await executeQuery(
            q_get_expense_categories,
            [userId, businessCategoryId]
        )
        var expense = retreivedExpenses.filter(data => data.type == 'expense')
        var income = retreivedExpenses.filter(data => data.type == 'income')
        res.status(200).json({
            expense: expense,
            income: income
        })
    } catch (err) {
        handleError(err, res)
    }
}

