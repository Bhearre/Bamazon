function getDisplayProductFromDBResults(results) {
    return results.map(result => {
        return '===============================' + '\n' +
               'ID: ' + result.item_id + '\n' + 
               'Name: ' + result.product_name + '\n' + 
               'Price: ' + result.price + '\n' + 
               '===============================';
    }).join('\n')
}

module.exports = {
    getDisplayProductFromDBResults
}