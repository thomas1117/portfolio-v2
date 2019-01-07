var path = require('path');

function addKeyWithProperty(obj, type, key, value) {
    if (!obj[type]) {
        obj[type] = {};
    }

    obj[type][key] = value;
    return obj;
}

module.exports = {
    transformLocalManifest: function (assets, entryPoints, BASE, buildCss) {
        let manifest = {};
        let o = assets;
        Object.keys(o).forEach(item => {
            let split = item.split('.');
            let type = split[1];
            let key = split[0];
            manifest = addKeyWithProperty(manifest, type, key, BASE + o[item])
        });

        if (buildCss) {
            entryPoints.forEach(item => {
                manifest = addKeyWithProperty(manifest, 'css', item, `${BASE}/dist/${item}.css`);
            });
        }
        
        console.log(manifest);
        return manifest;
    },
    transformProductionManifest: function(assets) {
        let manifest = {};
        let o = assets;
        Object.keys(o).forEach(item => {
            let split = item.split('.');
            let type = split[1];
            let key = split[0];
            manifest = addKeyWithProperty(manifest, type, key, o[item])
        });
        
        return manifest;
    }
}


