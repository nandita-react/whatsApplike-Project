const express=require('express');
const routes=express.Router()

const GroupController=require('../group/controller');
const auth=require('../middleware/auth')

routes.post('/create',auth, GroupController.create);

routes.get('/:id', GroupController.findById);

routes.patch('/:groupId/add-member/:userId', GroupController.addmembers);

routes.patch('/:groupId/assign-admin/:userId', GroupController.assignAdmin);


routes.delete('/:deleteId', GroupController.deleteGroup);

module.exports=routes
