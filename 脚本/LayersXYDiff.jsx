function collectLayers (layer, collect) {
	for (var i = 0, n = layer.layers.length; i < n; i++) {
		var child = layer.layers[i];
		//if (!child.visible) continue;
		if (child.bounds[2] == 0 && child.bounds[3] == 0) continue;
		if (child.layers && child.layers.length > 0)
			collectLayers(child, collect);
		else if (child.kind == LayerKind.NORMAL) {
			collect.push(child);
			//child.visible = false;
		}
	}
}

function findLayerByName(layers,name)
{
	for(var i = 0;i<layers.length;i++)
	{
		if(layers[i].name == name)
		{
			return layers[i];
		}
	}
	return null;
}

function indexOf(array,item)
{
	for(var i = 0;i<array.length;i++)
	{
		if(array[i] == item)
		{
			return i;
		}
	}
	return -1;
}

var filter  = [
	"w_equip_weapon",
      "w_equip_weapon1",
      "w_equip_weapon2",
      "w_equip_weapon3",
      "w_equip_weapon4",
      "w_equip_weapon5",
      "w_equip_weapon6",
      "w_equip_weapon7",
	"w_equip_hair",
	"w_body_hair",
	"w_equip_top",
	"w_equip_low",
	"w_body_face",
	"w_body_skin",
	"m_equip_weapon",
      "m_equip_weapon1",
      "m_equip_weapon2",
      "m_equip_weapon3",
      "m_equip_weapon4",
      "m_equip_weapon5",
      "m_equip_weapon6",
      "m_equip_weapon7",
	"m_equip_hair",
	"m_body_hair",
	"m_equip_top",
	"m_equip_low",
	"m_body_face",
	"m_body_skin"
	];

var documentW = activeDocument.width;
var documentH = activeDocument.height;

var layers = [];
collectLayers(app.activeDocument,layers);
var xys = "";
var types = new Array();
for(var i = 0;i<layers.length;i++)
{
	var li = layers[i].name.split("_");
	var type = li[0]+"_"+li[1]+"_"+li[2];
	if(types[type] == null)
	{
		types[type] = 1;
	}
	if(indexOf (filter, type) != -1)
	{
		if(layers[i].name.indexOf("_old") != -1)
		{
			continue;
		}
		var oldLayer = findLayerByName (layers,layers[i].name+"_old");
		if(oldLayer == null)
		{
			alert("ȱ�پ�ͼ��"+layers[i].name+"_old");
			break;
		}
		var oldx = oldLayer.bounds[0].as("px");
		var oldy = oldLayer.bounds[1].as("px");
		var oldx1= oldLayer.bounds[2].as("px");
		var oldy1 = oldLayer.bounds[3].as("px");
		var oldWidth = oldx1-oldx;
		var oldHeight = oldy1-oldy;
		//תΪspine�������
		oldy = documentH-oldy-oldHeight;
		// ȡ���ĵ�
		oldx += Math.round(oldWidth/2);
		oldy += Math.round(oldHeight/2);
		
		var x = layers[i].bounds[0].as("px");
		var y = layers[i].bounds[1].as("px");
		var x1 = layers[i].bounds[2].as("px");
		var y1 = layers[i].bounds[3].as("px");
		var width = x1-x;
		var height = y1-y;
		//תΪspine����ϵ
		y = documentH-y-height;
		//ȡ���ĵ�����
		x += Math.round(width/2);
		y += Math.round(height/2);
		//�����ֵ��ʱ��Ҫע�⣬photoShop�ģ�0,0�������Ͻǣ���spine�ģ�0,0�������½�
		//ͨ���� DocumentH-y-heit �����໥ת��
		xys += layers[i].name + ":"+x+","+y+","+(width)+","+(height)+"          "+"\n";
		xys += oldLayer.name + ":"+oldx+","+oldy+","+(oldWidth)+","+(oldHeight)+"          "+"\n";
		//����x ��y ֮����ǰ��һ����һ�����µļ��ɵģ�һ���Ǿɵļ�ȥ�µģ���Ҫ����Ϊ photoshop��spine������ϵ�Ĳ�ͬ
		xys += layers[i].name+"_del:"+(x-oldx)+","+(y-oldy) + "\n";
	}
}

/*for(x in types)
{
	xys += (x+ "\n");
}*/

var path1 = activeDocument.path.toString();
var file = new File(path1 + "/position" + ".txt");

file.remove();
file.open("w", "TEXT");
file.lineFeed = "\n";
file.write(xys);
file.close();
