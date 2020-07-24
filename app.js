const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const { argv, title } = require('process');

/*
let message = "Youhou la famille !"
fs.writeFile('message.txt',message,(err)=>{
    if(err) throw err;
    console.log("Fichier bien crée");
})

fs.readFile('message.txt', 'utf8', (err, data) => {
    if(err) throw err;
    console.log(data);
})

let parameter = process.argv[2];
if(parameter === "hello") {
    console.log("youhou la famille");
}
else if(parameter === "goodbye") {
    console.log("Bonne nuit les petits");
} */


/* let parameter = process.argv[2];
let user = process.argv[3];
if(parameter == "add") {
    fs.appendFile('users.txt',"\n" + user,(err)=>{
        if(err) throw err;
        console.log("User bien ajouter");
    });
}
else if(parameter === "list") {
    fs.readFile('users.txt', 'utf8', (err, data) => {
        if(err) throw err;
        console.log(data);
    })
} */

// La function au dessus et en dessous font la même chose

/* const action = process.argv[2];

switch(action) {
    case 'add':
        console.log(chalk.white.bgMagenta("Add user in file"));
        const user = process.argv[3];
        fs.appendFile('users.txt', user + "\n", (err)=>{
            if(err) throw err;
        })
        break;
    case 'list':
        console.log("List all users"); 
        fs.readFile('users.txt', 'utf8', (err, data) => {
            if(err) throw err;
            console.log(chalk.white.bgMagenta(data));
        });
        break;
    default:
        console.log(chalk.bold.red("No comprendo"));
} */

// la version en dessous permet d'avoir une doc avec les mêmes fonctions que au dessus
// et aussi d'envoyer les données en format JSON

/* function loadDatas(path) {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}
yargs
    .command({
        command: 'add',
        describe: 'Add someone on the list',
        builder: {
            name: {
                describe: 'Name of someone',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            console.log("Add user in file");
            let users = loadDatas('users.json');
            users.push(argv.name);
            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) throw err;
                console.log("User add");
            })
        }
    })
    .command({
        command: 'list',
        describe: 'View the list',
        handler: () => {
            console.log("List all users"); 
            let users = loadDatas('users.json');
            console.log(users);
        }
    })
.argv  */

/* console.log(chalk.bold("Je suis gras"));
console.log(chalk.green("Success"));
console.log(chalk.bold.inverse.green('truc')); */

/* yargs.command({
    command: 'hi',
    describe: 'Say hello !',
    builder: {
        name: {
            describe: 'Name of someone',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => {
        console.log(`Youhou ${argv.name}`);
    }
}).argv */

/* fs.readFile('messages.json', (err, data) => {
    if(err) throw err;
    const dataString = data.toString();
    const dataJson = JSON.parse(dataString)
    console.log(dataJson[0]);
})

const user = {
    name: "JB Lavisse",
    age: 22,
    job: "Glandeur pro"
}

fs.writeFile('user.json',JSON.stringify(user),(err) => {
    if(err) throw err;
    console.log(`Utilisateur ${user.name} ajouté`);
}) */
function loadDatas(path) {
    let data = fs.readFileSync(path);
    return JSON.parse(data.toString());
}

yargs
    .command({
        command: 'list',
        describe: 'View the list of title note',
        handler: () => {
            console.log("List all note"); 
            let notes = loadDatas('notes.json');
            console.log(notes);
        }
    })
    .command({
        command: 'add',
        describe: 'Add a note on the list',
        builder: {
            title: {
                describe: 'Unique title for your note',
                demandOption: true,
                type: 'string'
            },
            body: {
                describe: 'Container of your note',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            let notesList = loadDatas("notes.json");
            let newNote = {
              title: argv.title,
              body: argv.body,
            };
            let lookIfExist = notesList.map((note) => {
              if (argv.title === note.title) {
                let isExist = 1;
                return isExist
              }
          });
            if (lookIfExist.includes(1)) {
              console.log("This title is already exist");
            } else
              notesList.push(newNote),
                fs.writeFile("notes.json",JSON.stringify(notesList),(err) => {
                    if (err) throw err;
                    console.log("Note add on the list");
                  }
                );
        }
    })
    .command({
        command: 'remove',
        describe: 'Delete the note',
        builder: {
            title: {
                describe: 'The title you want delete',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            let notes = loadDatas('notes.json');
            notes.filter((title) => argv.title !== title);
            console.log(notes.title);
            console.log(notes);
        }
    })
    .command({
        command: 'read',
        describe: 'Add someone on the list',
        builder: {
            title: {
                describe: 'The title of the note you want to see',
                demandOption: true,
                type: 'string'
            }
        },
        handler: (argv) => {
            let notes = loadDatas('notes.json');
            notes.filter((title) => argv.title !== title);
        }
    })
.argv