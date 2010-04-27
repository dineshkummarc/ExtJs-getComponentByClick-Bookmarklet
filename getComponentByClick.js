/*
 * Use this code as a bookmarklet
 * When executed, click anywhere and it will try to find the related Ext.Component
 * The found component is stored in window.clickedComp
 */
(function(){
    function getCompByClick(ev, el){
        var comp = getCompByEl(el);
        window.clickedComp = comp; //change this if you don't like it !
        console.log('Found parent (',comp,') for clicked element (',el,')');
        console.log('Stored in window.clickedComp');
    }
    function getCompByEl(el){
        var comp;
        //the [id] selector may catch false positive such as tab headers'<li id="ext-comp-1044__ext-comp-1046">
        //so if the comp is not found, go on with up()
        while(!comp && (el = Ext.get(el).up('[id^=ext-comp]'))){
            comp = Ext.ComponentMgr.all.find(function(c){
                return c.el && (c.el.id == el.id);
            });
        }
        return comp;
    }
    Ext.getBody().on('click', getCompByClick, null, {single : true});
})();

/*

javascript:(function(){function getCompByClick(ev,el){var comp=getCompByEl(el);window.clickedComp=comp;console.log('Found parent (',comp,') for clicked element (',el,')');console.log('Stored in window.clickedComp');}function getCompByEl(el){var comp;while(!comp&&(el=Ext.get(el).up('[id^=ext-comp]'))){comp=Ext.ComponentMgr.all.find(function(c){return c.el&&(c.el.id==el.id);});}return comp;}Ext.getBody().on('click',getCompByClick,null,{single:true});})();

*/