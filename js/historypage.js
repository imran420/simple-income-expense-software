const database = firebase.firestore();
const maincollection = database.collection('accounts');
const incomesubcollection = maincollection.doc('1').collection('income');

//total income
const queryforlistincome = incomesubcollection.orderBy('date','desc');
var totalincome = 0;
queryforlistincome.get().then(snapshot => {
    snapshot.forEach(user => {
        totalincome= totalincome + parseInt(user.data().paidamount)
    });
    document.getElementById('totalincome').innerHTML = totalincome;
});


//-----------------------------today income----------------------------------------
// var todaYdateforincome =moment().format("YYYY-MM-DD").toString();
// var totaltodayincome =0;
// const queryforlastmonthincome = incomesubcollection.where('date','==',todaYdateforincome);
// queryforlastmonthincome.get().then(snapshot => {
//     snapshot.forEach(user => {
//         totaltodayincome= totaltodayincome + parseInt(user.data().incomeamount);
//     });
//     document.getElementById('todayincome').innerHTML = totaltodayincome;
// });

//-----------------------------------------------------------------------------------------


//----------------------------last month expense-------------------------------------------
var demomonth = parseInt(moment().format("MM"));
demomonth = demomonth-1;
var demoyear = moment().format("YYYY");
var demodaystart = "01";
var demodayend = "30";
var maindateforlastmonthincome = "";
var maindateforlastmonthincomeend = "";
if(demomonth<10){
    maindateforlastmonthincome = demoyear+"-0"+demomonth.toString()+"-"+demodaystart;
    maindateforlastmonthincomeend = demoyear+"-0"+demomonth.toString()+"-"+demodayend;
}
else {
    maindateforlastmonthincome = demoyear+"-"+demomonth.toString()+"-"+demodaystart;
    maindateforlastmonthincomeend = demoyear+"-"+demomonth.toString()+"-"+demodayend;
}

var totallastmonthincome= 0;
const queryformonthincome = incomesubcollection.where('date','>=',maindateforlastmonthincome).where('date','<=',maindateforlastmonthincomeend);
queryformonthincome.get().then(snapshot => {
    snapshot.forEach(user => {
        totallastmonthincome= totallastmonthincome + parseInt(user.data().paidamount);
    });
    document.getElementById('lastmontheincome').innerHTML = totallastmonthincome;
    console.log(totallastmonthincome);
});
//=------------------------------------------------------------------------------------------

//------------------------------------expense table value show--------------------------------

const maincollectionexpense = database.collection('accounts');
const expensesubcollection = maincollectionexpense.doc('2').collection('expense');

//-------------------------------------------------------------------------------------
//--------------------------------total expense---------------------------------------
const queryforlistexpense = expensesubcollection.orderBy('date','desc');
var totalexpense = 0;
queryforlistexpense.get().then(snapshot => {
    snapshot.forEach(user => {
        totalexpense= totalexpense + parseInt(user.data().expenseamount);
    });
    document.getElementById('totalexpense').innerHTML = totalexpense;
});
//-------------------------------------------------------------------------------------
//===========================================last month expense========================

var totallastmonthexpense= 0;
var totallastmonthincomep= 0;
const queryformonthexpense = expensesubcollection.where('date','>=',maindateforlastmonthincome).where('date','<=',maindateforlastmonthincomeend);
queryformonthexpense.get().then(snapshot => {
    snapshot.forEach(user => {
        totallastmonthexpense= totallastmonthexpense + parseInt(user.data().expenseamount);
    });
    document.getElementById('lastmonthexpense').innerHTML = totallastmonthexpense;
    const queryforlastmonthincome = incomesubcollection.where('date','>=',maindateforlastmonthincome).where('date','<=',maindateforlastmonthincomeend);
    queryforlastmonthincome.get().then(snapshot =>{
        snapshot.forEach(user => {
            totallastmonthincomep = totallastmonthincomep + parseInt(user.data().paidamount);
        });
       var torallastmonthbalance = (totallastmonthincomep - totallastmonthexpense);
       console.log(totallastmonthincomep);
       console.log(totallastmonthexpense);

        document.getElementById('lastmonthebalance').innerHTML = torallastmonthbalance;

    })
});


//===========================================Current balance====================================
function currentbalance() {
    const queryforlistincome = incomesubcollection.orderBy('date','desc');
    var totalincomecur = 0;
    queryforlistincome.get().then(snapshot => {
        snapshot.forEach(user => {
            totalincomecur= totalincomecur + parseInt(user.data().paidamount);
        });
        //document.getElementById('totalincomecur').innerHTML = totalincomecur;
        const queryforlistexpense = expensesubcollection.orderBy('date','desc');
        var totalexpense = 0;
        queryforlistexpense.get().then(snapshot => {
            snapshot.forEach(user => {
                totalexpense= totalexpense + parseInt(user.data().expenseamount);
            });
            var currentbalancetotal = (totalincomecur-totalexpense);
            document.getElementById('currentbalance').innerHTML = currentbalancetotal;
        });

    });

}
currentbalance();



//////////////////////////////////////current month balance///////////////////////////////////////////

var demomonthcur = moment().format("MM");
var demoyearcur = moment().format("YYYY");
var demodaystartcur = "01";
var demodayendcur = "30";
var maindateforlastmonthincomecur = "";
var maindateforlastmonthincomeneendcur = "";
    maindateforlastmonthincomecur = demoyearcur+"-"+demomonthcur+"-"+demodaystartcur;
    maindateforlastmonthincomeneendcur = demoyearcur+"-"+demomonthcur+"-"+demodayendcur;

var totallastmonthincomecur= 0;
const queryformonthincomecur = incomesubcollection.where('date','>=',maindateforlastmonthincomecur).where('date','<=',maindateforlastmonthincomeneendcur);
queryformonthincomecur.get().then(snapshot => {
    snapshot.forEach(user => {
        totallastmonthincomecur = totallastmonthincomecur + parseInt(user.data().paidamount);
    });
    var totallastmonthexpensecur = 0;
    const queryformonthexpensecur = expensesubcollection.where('date', '>=', maindateforlastmonthincomecur).where('date', '<=', maindateforlastmonthincomeneendcur);
    queryformonthexpensecur.get().then(snapshot => {
        snapshot.forEach(user => {
            totallastmonthexpensecur = totallastmonthexpensecur + parseInt(user.data().expenseamount);
        });
        document.getElementById('thismonthincome').innerHTML = totallastmonthincomecur;
        document.getElementById('thismonthexpense').innerHTML = totallastmonthexpensecur;
        console.log(totallastmonthincome);
        const totalbalance = (totallastmonthincomecur-totallastmonthexpensecur);
        document.getElementById('thismonthebalance').innerHTML = totalbalance;

    });
});



/////////////////////////////////for due///////////////////////////////////////////////////////////////

const duesubcollection = maincollection.doc('3').collection('due');
var totaldueforthismoth = 0;
const queryforthismonthdue = duesubcollection.where('date','>=',maindateforlastmonthincomecur).where('date','<=',maindateforlastmonthincomeneendcur);
queryforthismonthdue.get().then(snapshot => {
    snapshot.forEach(user => {
        totaldueforthismoth = totaldueforthismoth + parseInt(user.data().dueamount);
    });
    document.getElementById('thismonthdue').innerHTML = totaldueforthismoth;
});



var totaldueforlastmoth = 0;

const queryforlastmonthdue = duesubcollection.where('date','>=',maindateforlastmonthincome).where('date','<=',maindateforlastmonthincomeend);
queryforlastmonthdue.get().then(snapshot => {
    snapshot.forEach(user => {
        totaldueforlastmoth = totaldueforlastmoth + parseInt(user.data().dueamount);
    });
    document.getElementById('lastmonthedue').innerHTML = totaldueforlastmoth;
});




var totaldue = 0;

const queryfortotaldue = duesubcollection.orderBy('date','desc');
queryfortotaldue.get().then(snapshot => {
    snapshot.forEach(user => {
        totaldue = totaldue + parseInt(user.data().dueamount);
    });
    document.getElementById('due').innerHTML = totaldue;
});


var totalloan =0;
const queryfortotalloan = incomesubcollection.where('incomecategory','==','লোন');

queryfortotalloan.get().then(snapshot => {
    snapshot.forEach(user => {
        totalloan = totalloan + parseInt(user.data().paidamount);
    });
    document.getElementById('totalloan').innerHTML = totalloan;
});




var totalloanpaid =0;
const queryfortotalloanpaid = expensesubcollection.where('expensecategory','==','লোন');

queryfortotalloanpaid.get().then(snapshot => {
    snapshot.forEach(user => {
        totalloanpaid = totalloanpaid + parseInt(user.data().expenseamount);
    });
    document.getElementById('totalpaidloan').innerHTML = totalloanpaid;
});


