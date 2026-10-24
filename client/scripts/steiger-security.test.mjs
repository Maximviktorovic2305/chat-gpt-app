import {test} from 'node:test';
import assert from 'node:assert/strict';
import {processConfiguration} from 'steiger';
const plugin=check=>({meta:{name:'fixture',version:'1'},ruleDefinitions:[{name:'fixture/rule',check}]});
test('patched configuration keeps optional rule maps and rejects unsafe shapes',()=>{
  const config=processConfiguration([plugin(()=>({diagnostics:[]})),{rules:{'fixture/rule':'error'}}],null);
  assert.ok(config);
  for(const rules of [{'fixture/rule':'invalid'},{'unknown/rule':'error'}])
    assert.throws(()=>processConfiguration([plugin(()=>({diagnostics:[]})),{rules}],null));
  assert.throws(()=>processConfiguration([plugin('not callable'),{rules:{'fixture/rule':'error'}}],null));
});
test('patched function schema validates synchronous and asynchronous plugin results',async()=>{
  for(const check of [()=>({invalid:true}),async()=>({invalid:true})]){
    const config=processConfiguration([plugin(check),{rules:{'fixture/rule':'error'}}],null);
    const wrapped=config.find(row=>row.ruleDefinitions)?.ruleDefinitions[0].check;
    assert.ok(wrapped);
    await assert.rejects(async()=>wrapped({},{}));
  }
});
