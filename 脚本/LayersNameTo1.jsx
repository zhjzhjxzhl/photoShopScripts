function collectLayers (layer, collect) {
	for (var i = 0, n = layer.layers.length; i < n; i++) {
		var child = layer.layers[i];
		if (!child.visible) continue;
		if (child.bounds[2] == 0 && child.bounds[3] == 0) continue;
		if (child.layers && child.layers.length > 0)
			collectLayers(child, collect);
		else if (child.kind == LayerKind.NORMAL) {
			collect.push(child);
			child.visible = false;
		}
	}
}

var layers = [];
collectLayers(app.activeDocument,layers);
for(var i = 0;i<layers.length;i++)
{
	layers[i].name = layers[i].name+"_1";
}