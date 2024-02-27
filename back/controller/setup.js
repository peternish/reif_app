const { handleError, executeQuery, getCu, getCurrentNoderrentNode, getParentNode } = require("../helper/helper")

var q_get_category_with_node_id = `
                SELECT data
                FROM business_categories
                WHERE id = ?
            `
var q_update_category = `
                UPDATE business_categories
                SET data = ?
                WHERE id = ?
            `

module.exports.addBusinessCategory = async (req, res) => {
    try {
        var userId = req.userId
        var name = req.body.name
        var parent = req.body.parent
        var insertData = null

        if (parent == 0) { // create main category
            insertData = JSON.stringify({
                name: name,
                children: []
            })

            var q_insert_category = `
                INSERT INTO business_categories
                (user_id, data)
                VALUES (?, ?)
            `

            await executeQuery(
                q_insert_category,
                [userId, insertData]
            )
        }
        else { // create sub category
            var nodeIdArr = parent.split('-');
            console.log(nodeIdArr, 'nodeIdArr')
            var retreivedCategory = await executeQuery(
                q_get_category_with_node_id,
                [nodeIdArr[0]]
            )
            var categoryData = JSON.parse(retreivedCategory[0].data);
            if (nodeIdArr.slice(1) == []) { // which means the parent is the root node - main business category.
                categoryData.children.push({
                    id: `${retreivedCategory[0].id}-${categoryData.children.length}`,
                    name: name,
                    children: []
                })
            }
            else { // parent node is not the main category
                let parentNode = getCurrentNode(nodeIdArr, categoryData);
                parentNode['children'].push({
                    id: parent + `-${parentNode['children'].length}`,
                    name: name,
                    children: []
                });
            }
            categoryData = JSON.stringify(categoryData)
            await executeQuery(
                q_update_category,
                [categoryData, nodeIdArr[0]]
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

        var retreivedCategory = await executeQuery(
            q_get_category_with_node_id,
            [id]
        )
        console.log(retreivedCategory[0])
        var categoryData = JSON.parse(retreivedCategory[0].data);
        var node = getCurrentNode(nodeIdArr, categoryData)
        node['name'] = name
        categoryData = JSON.stringify(categoryData)
        await executeQuery(
            q_update_category,
            [categoryData, id]
        )
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
                q_get_category_with_node_id,
                [id]
            )
            var categoryData = JSON.parse(retreivedCategory[0].data);
            var node = getParentNode(nodeIdArr, categoryData)
            node['children'] = node['children'].filter(child => child.id != nodeId)
            categoryData = JSON.stringify(categoryData)
            await executeQuery(
                q_update_category,
                [categoryData, id]
            )
        }
        res.status(200).json({})
    } catch (err) {
        handleError(err, res)
    }
}

module.exports.getBusinessCategory = async (req, res) => {
    try {
        var userId = req.userId
        var q_get_categories = `
            SELECT id, data
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