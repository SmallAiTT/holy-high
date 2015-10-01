/**
 * Created by SmallAiTT on 2015/7/3.
 */
module tc{
    unit.curModuleName = moduleName_Node;

    unit.addMenuItem('Node4Clip 矩形', function(){
        var node1 = new hh.Node();
        node1.x = node1.y = 100;
        node1.width = node1.height = 100;
        // 设置矩形裁剪
        node1.clip = hh.Node.CLIP_RECT;

        var node2 = new hh.Node();
        node2.x = node2.y = 100;
        node2.width = node2.height = 100;
        node2._nodeOpt.debugRectColor = 'blue';

        hh.engine.stage.addChild(node1);
        node1.addChild(node2);
    });

    unit.addMenuItem('Node4Clip 圆形', function(){
        var node1 = new hh.Node();
        node1.x = node1.y = 100;
        node1.width = node1.height = 100;
        // 设置矩形裁剪
        node1.clip = hh.Node.CLIP_ARC;

        var node2 = new hh.Node();
        node2.x = node2.y = 100;
        node2.width = node2.height = 100;
        node2._nodeOpt.debugRectColor = 'blue';

        hh.engine.stage.addChild(node1);
        node1.addChild(node2);
    });

}
