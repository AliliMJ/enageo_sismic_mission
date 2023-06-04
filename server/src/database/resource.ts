// interface ResourceType {
//   stock:any,
//   data:any
// }
// export class Resource {
//   constructor(resource:) {
//     const { stock, data, ...others } = { ...resource.stock, ...resource.data };
//     const _resource = { ...stock, ...data, ...others };
//     _resource.transform = new Function(resource.rules.transform);
//     _resource.threshold = new Function(resource.rules.threshold);
//     return _resource;
//   }
// }
// export function createConsumption(resource) {
//   const consumption = resource.transform();
//   return consumption;
// }

// const r = new Resource({
//   data: {
//     titre: 'eau',
//     volume: 1,
//     prixU: 4,
//   },
//   rules: {
//     transform: 'return {titre:this.titre, cout:this.volume * this.prixU}',
//     isLow: 'return this.volume < 10',
//   },
// });
// //console.log(r);
// const c = createConsumption(r);
// console.log(r.isLow());

// console.log(c);
