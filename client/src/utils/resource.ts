type ResourceType = {
  stock: any;
  data: any;
  [key: string]: any;
  rules: {
    transform: string;
    threshold: string;
  };
};
export class Resource {
  public transform: Function;
  public threshold: Function;
  [key: string]: any;

  constructor(resource: ResourceType) {
    this.transform = new Function(resource.rules.transform);
    this.threshold = new Function(resource.rules.threshold);
    const { data, stock, ...other } = resource;

    Object.assign(this, resource.data, resource.stock, other);
  }
}
export function createConsumption(resource: Resource) {
  const consumption = resource.transform();
  return consumption;
}

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
