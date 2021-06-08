import readlineSync from "readline-sync"
import fs from "fs"

const incompleteMark = String.fromCodePoint(0x1f534)
const completedMark = String.fromCodePoint(0x1f7E2)

let list = [];
if(fs.existsSync('list.txt')){
    list = JSON.parse(fs.readFileSync(`./list.txt`,'utf8'));
}

let selection;

do{
    const options = ['add', 'list', 'check', 'remove', 'pomodoro'];
    selection = readlineSync.keyInSelect(options, 'Type your command');
    console.log(selection)
    switch(selection){
        case 0:
            list.push({chore: readlineSync.question(`What do you want to do?`), completed:false, pomodoro:0})
            break;
        case 1:
            console.log("========================")
            if(list.length!==0){
                list.forEach((item)=>console.log(`${item.completed?completedMark:incompleteMark} ${item.chore}`))
            }else{
                console.log('You dont have any chores listed')
            }
            console.log("========================")
            break;
        case 2:
            if(list.length!==0){
                for(let check;check!==-1;){
                    console.log("========================")
                    check=readlineSync.keyInSelect(list.map((item)=>`${item.completed?completedMark:incompleteMark} ${item.chore}`), '========================\nWhat todo do you want to check/uncheck?');
                    if(check!==-1)
                        list[check].completed=!list[check].completed
                }
            }else{
                console.log("========================")
                console.log('You dont have any chores listed')
                console.log("========================")
            }
            break;
        case 3:
            if(list.length!==0){
                for(let remove=0;remove>-1&&list.length>0;){
                    console.log(remove)
                    console.log("========================")
                    remove=readlineSync.keyInSelect(list.map((item)=>`${item.completed?completedMark:incompleteMark} ${item.chore}`), '========================\nWhat do you want to remove?');
                    
                    if(remove!==-1)
                        list.splice(remove,1)
                    
                }
            }else{
                console.log("========================")
                console.log('You dont have any chores listed')
                console.log("========================")
            }
            break;
        case 4:
            if(list.filter(item=> !item.completed).length!==0){
                for(let pomodoroOption=0;pomodoroOption>-1;){
                    console.log(pomodoroOption)
                    console.log("========================")
                    pomodoroOption=readlineSync.keyInSelect(list.filter(item=> !item.completed).map((item)=>`${incompleteMark} ${item.chore}`), '========================\nWhat todo do you want to have a pomodoro?'); 

                    if(pomodoroOption!==-1)
                        console.log(`${list.filter(item=> !item.completed)[pomodoroOption].chore} pomodoro set`)
                }
            }else{
                console.log("========================")
                console.log('You dont have any incompleted chores')
                console.log("========================")
            }
            break;
        case -1:
            fs.writeFileSync(`list.txt`,JSON.stringify(list))
            break;
            
    }
}while(selection!==-1)
