/*
* 使用mockjs提供mock数据接口
* */
import Mock from 'mockjs'
import data from './data.json'

Mock.mock('/info',{code:0,data: data.info});
Mock.mock('/goods',{code:0,data: data.goods});
Mock.mock('/ratings',{code:0,data: data.ratings});


//export default  不需要向外暴露任何数据，只需要执行一遍
