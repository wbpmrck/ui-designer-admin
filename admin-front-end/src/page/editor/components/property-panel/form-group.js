

/**
 * 表单行
 */
class FormLine {

  constructor(){
    this.spaceLeft = 24; // 默认有24格的空间
    this.fields=[]; //一行内排列的属性字段。这些控件的空间加起来不能超过24
  }

  /**
   * 给当前行添加字段，如果返回true,则表示此行可以接受这个字段，返回false表示此行放不下
   * @param {Object} field 
   */
  addField(field){
    let ctlSpace = 0;
    //计算字段需要的空间
    field.form.forEach((c)=>{
      ctlSpace += parseInt(c.col);
    });

    if(ctlSpace <= this.spaceLeft){
      this.fields.push(field);
      this.spaceLeft -= ctlSpace;
      return true;
    }else{
      return false;
    }
  }
}
/**
 * 表单分组
 */
class FormGroup {

  constructor(name,collapsed){
    this.name = name;
    this.collapsed = !!collapsed;
    this.lines = []; //分组内的多行表单项
  }

  /**
   * 获取最后一行
   */
  getLastLine(){
    if(this.lines.length>0){
      return this.lines[this.lines.length-1]
    }else{
      return undefined;
    }
  }

  newLine(){
    let line = new FormLine();
    this.lines.push(line);
    return line;
  }

  addField(field){
    let lastLine = this.getLastLine();
    //第一次运行需要创建新行
    if(lastLine === undefined){
      lastLine = this.newLine();
    }


    //如果最后一行可以装下这个字段的所有控件，则结束
    if(lastLine.addField(field)){
      return;
    }else{
      //否则新建一行，然后装下这个字段
      lastLine = this.newLine();
      lastLine.addField(field);
      return;
    }
  }
}

export {
  FormLine,
  FormGroup,
}