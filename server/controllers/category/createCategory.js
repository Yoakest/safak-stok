const createCategory= (req, res) => {
    const {name} = req.body;
    const Category =require('../../models/category');
    Category.create(name);
    
}