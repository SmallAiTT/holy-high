/**
 * Created by SmallAiTT on 2015/7/3.
 */
///<reference path="../../tc_init.ts" />
module tc{
    unit.curModuleName = moduleName_Node;

    var func4RelativeType = function(relativeType){
        unit.addMenuItem('Node4Layout relativeType ' + relativeType, function(){
            var node1 = new hh.Node();
            node1.name = 'node1';
            node1.width = node1.height = 200;
            node1.x = node1.y = 200;

            var node2 = new hh.Node();
            node2.width = node2.height = 100;
            var layout = node2.layout = new hh.Layout();
            layout.relativeType = relativeType;
            layout.x = layout.y = 20;

            var stage:hh.Node = hh.engine.stage;
            stage.addChild(node1);
            node1.addChild(node2);
        });
    };

    var func4LinearType = function(linearType){
        unit.addMenuItem('Node4Layout linearType ' + linearType, function(){
            var node1 = new hh.Node();
            node1.name = 'node1';
            var layout1 = node1.layout = new hh.Layout();
            layout1.linearType = linearType;
            layout1.padding = [10, 10, 20, 20];
            layout1.x = layout1.y = 200;
            node1.width = node1.height = 100;

            for(var i = 0; i < 4; ++i){
                var node2 = new hh.Node();
                node2.name = 'node_' + i;
                node2.width = node2.height = 50;
                var layout = node2.layout = new hh.Layout();
                layout.x = layout.y = 20;
                layout.margin = [10, 10, 20, 20];

                node1.addChild(node2);
            }

            var stage:hh.Node = hh.engine.stage;
            stage.addChild(node1);
        });
    };

    func4RelativeType(0);
    func4RelativeType(1);
    func4RelativeType(2);
    func4RelativeType(10);
    func4RelativeType(11);
    func4RelativeType(12);
    func4RelativeType(20);
    func4RelativeType(21);
    func4RelativeType(22);

    func4LinearType(0);
    func4LinearType(1);
    func4LinearType(-1);
    func4LinearType(2);
    func4LinearType(-2);

}