//googleフォームリストの更新を行う
function rewrite_GoogleFormsListItem() {
  const form = FormApp.openById('FORM1ID')
  const items = form.getItems()
  const section = rentchoicevalueslist()
  const nosection = returnnochoicevalueslists()
  console.log(section)
  //デバック用Google Formsの質問名と、IDを取得
  for (let i = 0; i < items.length; i++) {

    const item = items[i]
    const itemName = item.getTitle()
    const itemId = item.getId()

    console.log(`質問名 ${itemName}, \n質問のID ${itemId}`)

    //スプレッドシートのシェアハウスDBから内容を読み取って、Formの項目を更新する。
    if (itemName == '借りるものを選んでください') {
      items[i].asListItem().setChoiceValues(section)
      nosection.join
      items[i].setHelpText("現在貸出中のものは　"+nosection+",　です")
    }
  
  }
}


//[xxx,在庫ありor在庫なし]
function rentchoiceValues() {
  const spreadsheet =  SpreadsheetApp.openById('SPREADSHEET-ID');
  const sheet = spreadsheet.getSheetByName('goods_list');
  const lastRow = sheet.getLastRow()
  const valueslist = sheet.getRange(1, 2, lastRow, 2).getValues()
  valueslist.shift()
  console.log(valueslist)
  return valueslist
}

//プルダウンデータ[a,b,c,d,e,f,...]在庫あり名前だけ
function rentchoicevalueslist(){
 const valuelist =rentchoiceValues()
 var result = valuelist.filter( function( value){
   return value[1] == "在庫あり"
   })
 const result1 = result.map(elm=>elm[0])
 console.log(result1)
 return result1
}

//day,name,y/n,item,address,number
function returnchoiceValues() {
  const spreadsheet =  SpreadsheetApp.openById('SPREADSHEET-ID');
  const sheet = spreadsheet.getSheetByName('リクエスト');
  const lastRow = sheet.getLastRow()
  const valueslist = sheet.getRange(1, 1, lastRow, 7).getValues()
  valueslist.shift()
   const filterlist =valueslist.filter( function( value){
   return value[6] != 0
    })
 console.log(valueslist)
 console.log(filterlist)
  return filterlist
}

function returnnochoicevalueslists(){
  const novaluelist =returnchoiceValues()
  var result = novaluelist.filter( function( value){
   return value[2] == "n"
   })
 const result1 = result.map(elm　=> [elm[3]])
 console.log(result1)
 return result1
}

function returnAddGoogleFormsListItem() {
  const form = FormApp.openById('FORM2-ID')
  const items = form.getItems()
  let section = returnnochoicevalueslists()
  const long = section.length
  const empty =["空です(これを送信しないでください)"]
  if (long == 0){
    section = empty
  }
  //デバック用Google Formsの質問名と、IDを取得
  for (let i = 0; i < items.length; i++) {

    const item = items[i]
    const itemName = item.getTitle()
    const itemId = item.getId()
    console.log(`質問名 ${itemName}, \n質問のID ${itemId}`)

    //スプレッドシートのシェアハウスDBから内容を読み取って、Formの項目を更新する。
    if (itemName == '返すものを選んでください' ) {
     items[i].asListItem().setChoiceValues(section)
      }
    //if
  
   }//for
}//end
//リクエストページの書き換えn=>yへ
function delate (){
  const spreadsheet =  SpreadsheetApp.openById('SPREADSHEET-ID')
  const sheet = spreadsheet.getSheetByName('返却リクエスト')
  const sheetre = spreadsheet.getSheetByName("リクエスト")
  const lastRow = sheet.getLastRow()
  const need = sheet.getRange(lastRow,2).getValue()
  console.log(need)
  const sheet2 = returnchoiceValues()
  console.log(sheet2)
  const sheet2flat = sheet2.map(elm => elm[3])
  console.log(sheet2flat)
  const neetretu = sheet2flat.lastIndexOf(need)
  console.log(neetretu)
 sheetre.getRange(neetretu+2,3).setValue("y")
}
