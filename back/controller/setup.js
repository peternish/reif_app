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
                q_get_business_category_with_node_id,
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

module.exports.getAllSettingData = async(req, res) => {
    try {
        var q_get_all_setting_data = `
            SELECT id, origin_value as inputValue, category_name as categoryName, category_id as categoryID, type
            FROM setting
        `
        var allData = await executeQuery(
            q_get_all_setting_data
        )
        console.log(allData)
        res.status(200).json(allData)
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getSettingData = async(req, res) => {
    try {
        var id = req.query.id
        var q_get_categories = `
            SELECT id, origin_value as inputValue, category_name as categoryName, category_id as categoryID ,type
            FROM setting
            WHERE id = ?
        `
        var retreivedCategories = await executeQuery(
            q_get_categories,
            [id]
        )
        res.status(200).json(retreivedCategories)
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addSettingData = async(req, res) => {
    try {
        var inputValue = req.body.inputValue
        var type = req.body.type
        var category_id = req.body.categoryId
        var category_name = req.body.categoryName
        var q_insert_category = `
            INSERT INTO setting
            (origin_value, type, category_name, category_id)
            VALUES (?, ?, ?, ?)
        `

        await executeQuery(
            q_insert_category,
            [inputValue, type, category_name, category_id]
        )       
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editSettingData = async(req, res) => {
    try {
        var id = req.body.id
        var inputValue = req.body.inputValue
        var type = req.body.type
        var category_name = req.body.categoryName
        var category_id = req.body.categoryId

        var q_update_setting = `
                UPDATE setting
                SET origin_value = ?, type = ?, category_name = ?, category_id = ? 
                WHERE id = ?
            `
        await executeQuery(
            q_update_setting,
            [inputValue, type, category_name, category_id, id]
        )

        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteSettingData = async (req, res) => {
    try {
        var id = req.query.id
            var q_delete_category = `
                DELETE FROM setting
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [id]
            )
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}

module.exports.getVendor = async (req, res) => {
    try {
        var userId = req.userId
        var businessCategoryId = req.query.businessCategoryId
        var q_get_vendor_categories = `
            SELECT id, name
            FROM vendor_categories
            WHERE user_id = ? AND business_category_id = ?
            ORDER BY id
        `
        var retreivedVendor = await executeQuery(
            q_get_vendor_categories,
            [userId, businessCategoryId]
        )
        res.status(200).json({
            vendor: retreivedVendor
        })
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addVendorCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var type = req.body.type
        var parent = req.body.parent
        var categoryNodeId = req.body.categoryNodeId

        if (parent == 0) { // add main expense category
            var q_insert_vendor = `
                INSERT INTO vendor_categories
                (user_id, business_category_id, name)
                VALUES (?, ?, ?)
            `
            await executeQuery(
                q_insert_vendor,
                [userId, categoryNodeId, name]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editVendorCategory = async (req, res) => {
    try {
        var nodeId = req.body.vendorNodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_vendor_category_name = `
                UPDATE vendor_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_vendor_category_name,
                [name, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteVendorCategory = async (req, res) => {
    try {
        console.log(nodeId)
        var nodeId = req.query.nodeId
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM vendor_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}

module.exports.getDescriptionCategory = async (req, res) => {
    try {
        var userId = req.userId
        var businessCategoryId = req.query.businessCategoryId
        var q_get_desc_categories = `
            SELECT id, name
            FROM description_categories
            WHERE user_id = ? AND business_category_id = ?
            ORDER BY id
        `
        var retreivedVendor = await executeQuery(
            q_get_desc_categories,
            [userId, businessCategoryId]
        )
        res.status(200).json({
            description: retreivedVendor
        })
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addDescriptionCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var type = req.body.type
        var parent = req.body.parent
        var categoryNodeId = req.body.categoryNodeId

        if (parent == 0) { // add main desc category
            var q_insert_desc = `
                INSERT INTO description_categories
                (user_id, business_category_id, name)
                VALUES (?, ?, ?)
            `
            await executeQuery(
                q_insert_desc,
                [userId, categoryNodeId, name]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editDescriptionCategory = async (req, res) => {
    try {
        var nodeId = req.body.descriptionNodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_description_category_name = `
                UPDATE description_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_description_category_name,
                [name, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteDescriptionCategory = async (req, res) => {
    try {
        console.log(nodeId)
        var nodeId = req.query.nodeId
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM description_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}


module.exports.getPMethodCategory = async (req, res) => {
    try {
        var userId = req.userId
        var businessCategoryId = req.query.businessCategoryId
        var q_get_pm_categories = `
            SELECT id, name
            FROM payment_method_categories
            WHERE user_id = ? AND business_category_id = ?
            ORDER BY id
        `
        var retreivedVendor = await executeQuery(
            q_get_pm_categories,
            [userId, businessCategoryId]
        )
        res.status(200).json({
            pMethod: retreivedVendor
        })
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addPMethodCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var type = req.body.type
        var parent = req.body.parent
        var categoryNodeId = req.body.categoryNodeId

        if (parent == 0) { // add main pm category
            var q_insert_pm = `
                INSERT INTO payment_method_categories
                (user_id, business_category_id, name)
                VALUES (?, ?, ?)
            `
            await executeQuery(
                q_insert_pm,
                [userId, categoryNodeId, name]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editPMethodCategory = async (req, res) => {
    try {
        var nodeId = req.body.pMethodNodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_pmethod_category_name = `
                UPDATE payment_method_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_pmethod_category_name,
                [name, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deletePMethodCategory = async (req, res) => {
    try {
        console.log(nodeId)
        var nodeId = req.query.nodeId
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM payment_method_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}

module.exports.getPAccountCategory = async (req, res) => {
    try {
        var userId = req.userId
        var businessCategoryId = req.query.businessCategoryId
        var q_get_pc_categories = `
            SELECT id, name
            FROM pay_from_account_categories
            WHERE user_id = ? AND business_category_id = ?
            ORDER BY id
        `
        var retreivedVendor = await executeQuery(
            q_get_pc_categories,
            [userId, businessCategoryId]
        )
        res.status(200).json({
            pAccount: retreivedVendor
        })
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addPAccountCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var type = req.body.type
        var parent = req.body.parent
        var categoryNodeId = req.body.categoryNodeId

        if (parent == 0) { // add main pm category
            var q_insert_pc = `
                INSERT INTO pay_from_account_categories
                (user_id, business_category_id, name)
                VALUES (?, ?, ?)
            `
            await executeQuery(
                q_insert_pc,
                [userId, categoryNodeId, name]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editPAccountCategory = async (req, res) => {
    try {
        var nodeId = req.body.pAccountNodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_paccount_category_name = `
                UPDATE pay_from_account_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_paccount_category_name,
                [name, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deletePAccountCategory = async (req, res) => {
    try {
        var nodeId = req.query.nodeId
        console.log(nodeId)
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM pay_from_account_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}

module.exports.getCustomer = async (req, res) => {
    try {
        var userId = req.userId
        var businessCategoryId = req.query.businessCategoryId
        var q_get_customer_categories = `
            SELECT id, name
            FROM customer_categories
            WHERE user_id = ? AND business_category_id = ?
            ORDER BY id
        `
        var retreivedVendor = await executeQuery(
            q_get_customer_categories,
            [userId, businessCategoryId]
        )
        res.status(200).json({
            customer: retreivedVendor
        })
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.addCustomerCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var type = req.body.type
        var parent = req.body.parent
        var categoryNodeId = req.body.categoryNodeId

        if (parent == 0) { // add main expense category
            var q_insert_vendor = `
                INSERT INTO customer_categories
                (user_id, business_category_id, name)
                VALUES (?, ?, ?)
            `
            await executeQuery(
                q_insert_vendor,
                [userId, categoryNodeId, name]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.editCustomerCategory = async (req, res) => {
    try {
        var nodeId = req.body.customerNodeId
        var name = req.body.name
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // change the name of main business category
            var q_update_customer_category_name = `
                UPDATE customer_categories
                SET name = ?
                WHERE id = ?
            `
            await executeQuery(
                q_update_customer_category_name,
                [name, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.deleteCustomerCategory = async (req, res) => {
    try {
        var nodeId = req.query.nodeId
        var nodeIdArr = nodeId.split('-')
        var id = nodeIdArr[0]
        if (nodeIdArr.length == 1) { // in case of main category
            var q_delete_category = `
                DELETE FROM customer_categories
                WHERE id = ?
            `
            await executeQuery(
                q_delete_category,
                [nodeId]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err)
    }
}
