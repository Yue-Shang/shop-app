import {request} from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}
//商品信息
export class Goods {
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.lowNowPrice = itemInfo.lowNowPrice
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.columns = columns;
    this.services = services;
    this.realPrice = itemInfo.realPrice
  }
}
//商家信息
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

//商品参数
export class GoodsParam {
  constructor(info, rule) {
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

//商品推荐
export function getRecommend() {
  return request({
    url: 'http://152.136.185.210:8000/api/h8/recommend'
  })
}
// const g = new Goods()
// class Person {
//   constructor(name,age) {
//     this.name = name;
//     this.age = age;
//   }
// }
//  const p = new Person('smy',16)
