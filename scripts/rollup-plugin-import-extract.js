import MagicString from 'magic-string';
const fs=require('fs');
const crypto = require('crypto');

/**
 * 将import语句提取出来
 * @param config
 * identifier 需要提取的import的语句的特征,正则表达式
 * tmpFileName 提取后中转文件的名字, string
 * packedName 中间文件打包后的名字, string
 * eg 提取smelte
 * tmpFileName = 'smelteTMP.js';
 * identifier = new RegExp(/smelte(\/[a-zA-Z.]+)/)
 * @returns
 */
export function importDeclarationExtractPlugin(config) {
  const {identifier, tmpFileName, packedName} = config;
  const defaultImportSet = new Set();
  const namedImportSet = new Set();
  return {
    name: 'importDeclarationExtractPlugin', // this name will show up in warnings and errors
    async buildStart(){
      // 在开始构建之前，清空临时文件
      fs.writeFile(tmpFileName,'//this is generated file\n',(e) => {e && console.log(e);});
    },
    async transform(code){
      if (identifier.test(code)){
        const esTree = this.parse(code);
        // 抽取所有的 ImportDeclaration，并且排除css
        const importDeclarations = esTree.body.filter(b => b.type === 'ImportDeclaration').filter(
          i => i.source && identifier.test(i.source.value) && !i.source.value.includes('css'));
        if (importDeclarations.length === 0) return null;

        // 写入文件
        let content = '';
        importDeclarations.forEach(id => {
          const {specifiers, source : { value: path }} = id;
          /*
           * ImportDeclaration 支持三种
           * import {} from *               --------> ImportSpecifier
           * import { A as B } from *       --------> ImportSpecifier
           * import A from *                --------> ImportDefaultSpecifier
           *
           * 可能的冲突有：
           * 默认导入：
           *  从同一个文件默认导入，命名不同  -> 中间文件只导入一次，再次引入的时候具名并且as转换
           * 具名导入：
           *  不同文件中，可能有相同的具名导出值 -> 中间文件命名时加上文件路径hash， 再引入时转换为as
           */
          specifiers.forEach(s => {
            const { imported } = s;
            const imName = imported ? imported.name : undefined;
            if(s.type === 'ImportDefaultSpecifier') {
              const tmpName = `default_${getHash(path)}`;
              if (!defaultImportSet.has(tmpName)){
                defaultImportSet.add(tmpName);
                content += `import ${tmpName} from '${path}';\n`;
              }
            } else if(s.type === 'ImportSpecifier') {
              const tmpName = `${imName}_${getHash(path)}`;
              if (!namedImportSet.has(tmpName)) {
                namedImportSet.add(tmpName);
                content += `import {${imName} as ${tmpName}} from '${path}';\n`;
              }
            }
          });
        });
        // 将import语句提取到中间文件
        fs.appendFile(tmpFileName, content,e => {e && console.log(e);});

        const transformImport = (mc, imports) => {
          imports.forEach(id => {
            const {specifiers, start, end, source : { value: path }} = id;
            let ret = 'import {';
            specifiers.forEach(s => {
              const {imported, local: { name: lName }} = s;
              const imName = imported ? imported.name : undefined;
              if (s.type === 'ImportDefaultSpecifier') {
                // 默认导入
                ret += `default_${getHash(path)} as ${lName},`;
              } else if (s.type === 'ImportSpecifier') {
                // 具名导入
                const tmpName = `${imName}_${getHash(path)}`;
                ret += `${ tmpName } as ${lName},`;
              }
            });
            ret = ret.slice(0, ret.length - 1);
            ret += `} from '${packedName}';`;
            mc.overwrite(start, end, ret);
          });
          return mc.toString();
        };

        // 替换原文件中的语句
        const magicContent = new MagicString(code);
        const transformedCode = transformImport(magicContent, importDeclarations);
        return {
          code: transformedCode,
          map: null,
        };
      }
      return null;
    },
    buildEnd() {
      // 将所有的import的项目export出去
      let content = 'export {';
      Array.from(defaultImportSet).sort().forEach(i => {
        content += `${i},`;
      });
      Array.from(namedImportSet).sort().forEach(i => {
        content += `${i},`;
      });
      content = content.slice(0, content.length - 1);
      content += '};';
      fs.appendFile(tmpFileName, content,e => { e && console.log(e);});
    },
  };
}

export const immutableWrapper = (fn) => {
  const resultMap = new Map();
  return (...args2) => {
    const key = args2.join('-');
    if (resultMap.has(key)){
      return resultMap.get(key);
    } else {
      const ret = fn(...args2);
      resultMap.set(key, ret);
      return ret;
    }
  };
};

export const getHash = immutableWrapper((value) => {
  const fsHash = crypto.createHash('md5');
  fsHash.update(value);
  return fsHash.digest('hex').slice(0,8);
});
