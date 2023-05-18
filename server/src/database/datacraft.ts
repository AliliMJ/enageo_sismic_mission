import { schemaOf, matchSchema } from './helpers.ts';

function findRule(object: any, rules: Array<any>) {
  const s = schemaOf(object);

  //find which rule
  for (let rule of rules) {
    if (matchSchema(s, rule.pattern)) {
      return rule;
    }
  }
  return null;
}
// {x}, {x, y}

function Datacraft() {
  return {
    ghostData: new Array<any>(),
    rules: new Array<any>(),
    defineRule(prop: any) {
      //check the map schema should match the fact.schema
      for (let rule of this.rules) {
        if (
          Object.keys(prop.pattern).length > Object.keys(rule.pattern).length
        ) {
          if (matchSchema(prop.pattern, rule.pattern))
            throw `Ambiguity : The rule's pattern ${JSON.stringify(
              prop.pattern
            )} is included in the defined rule : ${JSON.stringify(rule)}`;
        } else {
          if (matchSchema(prop.pattern, rule.pattern))
            throw `Ambiguity : The rule's pattern ${JSON.stringify(
              prop.pattern
            )} will include the defined rule : ${JSON.stringify(rule)}`;
        }
      }
      this.rules.push({ pattern: prop.pattern, map: prop.map });
    },

    transformProcess(data: any) {
      const result = [];
      for (let o of data) {
        const rule = findRule(o, this.rules);
        if (rule) result.push(rule.map(o));
        else this.ghostData.push(o);
      }
      if (this.ghostData.length > 0)
        console.warn(
          'There are some schema that are not covered by the rules.'
        );
      return result;
    },
    // async execute() {
    //   const warehouse = createClient();
    //   // extract
    //   const data = extract({ frenqunecy });
    //   const output = this.transformProcess(data);
    //   //load the output in the data warehouse.
    //   try {
    //     await warehouse.insert({
    //       table: fact.name,
    //       values: output,
    //       format: 'JSONEachRow',
    //     });
    //     console.log('the data was inserted');
    //   } catch (e) {
    //     console.log('Error while loading the data', e);
    //   }

    //   console.log(output);
    // },
  };
}

export { Datacraft };
