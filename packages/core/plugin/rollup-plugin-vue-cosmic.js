import { MagicString, parse} from 'vue/compiler-sfc';
import { walk } from 'estree-walker';
import * as acorn from 'acorn';
import kebabcase from 'lodash.kebabcase';

export function cStyle(options) {
    options = options || {};
    options.target = options.target || 'c-style';
    options.propName = options.propName || 'styles';
    options.basePath = options.basePath || 'cosmic-design';

    function genProp(moduleName) {
        return `:${options.propName}="${moduleName}"`;
    }
    return {
        transform(code, id) {
            if (!id || !id.match(/App.vue$/)) return;
            const magicContent = new MagicString(code);
            const comp = parse(code, {filename: id});
            const module = {};
            let count = 0;
            let ast = comp.descriptor.script || comp.descriptor.scriptSetup;
            if (!ast || !ast.content) return;
            let script= acorn.parse(ast.content, {sourceType: 'module'});
            const sources = {};
            const tags = {};
            walk(script, {
                enter(node) {
                    if (node.type !== 'ImportDeclaration') return;
                    let source = node?.source?.value;
                    node.specifiers.forEach(spec => {
                        sources[spec.local.name] = source;
                        if(spec.imported) {
                            tags[spec.local.name] = kebabcase(spec.imported.name);
                        } else {
                            tags[spec.local.name] = kebabcase(spec.local.name);
                        }
                    });
                },
            });
            function inject(str) {
                if (!ast) return;
                magicContent.appendRight(ast.loc.start.offset, str);
            }
            function addModule(source){
                if (!module[source]){
                    module[source] = `_cssModlue_${count}`;
                }
                return module[source];
            }
            
            walkNode(comp.descriptor.template.ast, {
                enter ( node) {
                    const prop = hasProp(node, options.target);
                    if (ast && prop) {
                        count++;
                        let source = prop.value.content;
                        if (source.match(/^[./@]/)) {
                            // case ./xxx.module.css
                            // case /xxx
                            // case @baidu.xx.css
                            if(!source.match('.module.css$')) source = source + '.module.css';
                            addModule(source);
                            magicContent.overwrite(prop.loc.start.offset, prop.loc.end.offset, genProp(module[source]));
                        } else if (source.match(/^[-]/)) {
                            // case -icon
                            if (sources[node.tag]) {
                                if(!source.match('.module.css$')) source = source + '.module.css';
                                let newSource = sources[node.tag].replace(/\.\w+$/, '') + source;
                                addModule(newSource);
                                magicContent.overwrite(prop.loc.start.offset, prop.loc.end.offset, genProp(module[newSource]));
                            }
                        } else {
                            if(!source.match('.module.css$')) source = source + '.module.css';
                            if (tags[node.tag] && source.indexOf(tags[node.tag]) !== 0) {
                                source = tags[node.tag] + '-' + source;
                            }
                            let newSource = options.basePath + '/' + source;
                            addModule(newSource);
                            magicContent.overwrite(prop.loc.start.offset, prop.loc.end.offset, genProp(module[newSource]));
                        }
                    }
                } ,
            });
            Object.keys(module).forEach(source => {
                inject(`import ${module[source]} from '${source}';`);
            });
            // console.log(magicContent.toString());
            return {
                code: magicContent.toString(),
                map: magicContent.generateMap({source: id}),
            };
        },
    };
}

function walkNode(node, options, parent) {
    if(options.enter) options.enter(node, parent);
    (node.children || []).forEach((child) => {
        walkNode(child, options, node);
    });
    if(options.leave) options.leave(node, parent);
}

function hasProp(node, name) {
    if(!node || !node.props) return false;
    const rs = node.props.filter(item => item.name === name);
    if (rs[0] && rs[0].value && rs[0].value.content) return rs[0];
    return false;
}