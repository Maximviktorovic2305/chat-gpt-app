// Port the pinned Steiger 0.6 config schema to patched Zod 4.
// Upstream: feature-sliced/steiger, MIT. No validation rules are disabled.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const root=new URL('../node_modules/steiger/',import.meta.url);
const pkg=JSON.parse(readFileSync(new URL('package.json',root),'utf8'));
if(pkg.version!=='0.6.0')throw new Error('Review Steiger compatibility patch before upgrading');
const old='z.function().args().returns(z.union([z.promise(ruleResultScheme), ruleResultScheme]))';
const replacement=`z.custom(value => typeof value === 'function').transform(fn => (...args) => {
              const result = fn(...args);
              return result instanceof Promise ? result.then(value => ruleResultScheme.parse(value)) : ruleResultScheme.parse(result);
            })`;
let patched=false;
for(const name of readdirSync(new URL('dist/',root))){
  if(!name.endsWith('.mjs'))continue;
  const file=new URL('dist/'+name,root);
  let source=readFileSync(file,'utf8');
  if(source.includes(old)){
    if(!source.includes('rules: z.record('))throw new Error('Unexpected upstream schema');
    source=source.replace(old,replacement).replace('rules: z.record(','rules: z.partialRecord(');
    writeFileSync(file,source);
    patched=true;
  }else if(source.includes(replacement)&&source.includes('rules: z.partialRecord('))patched=true;
}
if(!patched)throw new Error('Pinned Steiger schema was not found: '+fileURLToPath(root));
