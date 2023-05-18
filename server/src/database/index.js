import { Datacraft } from './datacraft.js';

const E = [
  { product: { name: 'a', unitPrice: 120 }, quantity: 1 },
  { product: { name: 'b', unitPrice: 20 }, quantity: 1 },
  { product: { name: 'a', unitPrice: 120 }, quantity: 3 },
  { product: { name: 'a', unitPrice: 120 }, quantity: 2 },

  { product: { name: 'x' }, total: 200 },
  { product: { name: 'y' }, total: 800 },
  { product: { name: 'z' }, total: 300 },
  { product: { name: 't' }, total: 400 },

  { product: 'g', total: 900 },
  { product: 'k', total: 762 },
  { product: 'm', total: 91 },

  { product: { title: 'h' }, total: 72 },
  { product: { title: 'l' }, total: 82 },
  { product: { title: 's' }, total: 82 },
];

const extract = ({ frenqunecy }) => E;
const fact = { name: 'Sales' };

const dc = Datacraft({ fact, extract });

dc.defineRule({
  pattern: { product: { name: 'string' }, total: 'number' },
  map(o) {
    return { title: o.product.name, total: o.total };
  },
});

dc.defineRule({
  pattern: { product: 'string', total: 'number' },
  map(o) {
    return { title: o.product, total: o.total };
  },
});
dc.defineRule({
  pattern: { product: { title: 'string' }, total: 'number' },
  map(o) {
    return { title: o.product.title, total: o.total };
  },
});
dc.defineRule({
  pattern: {
    product: { name: 'string', unitPrice: 'number' },
    quantity: 'number',
  },
  map(o) {
    return {
      title: o.product.name,
      total: o.product.unitPrice * o.quantity,
    };
  },
});

const result = dc.transformProcess(E);
console.log(result);
