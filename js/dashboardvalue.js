const database = firebase.firestore();
const maincollection = database.collection('accounts');
const incomesubcollection = maincollection.doc('1').collection('income');
const userListincome = document.querySelector('#incomehistory');

function renderincomelist(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdname = document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tddob = document.createElement('div');

    divcontainer.setAttribute("class","list_flex");
    tdname.setAttribute("class","list_flex_value");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdname.textContent = user.data().date;
    tdidnumbeer.textContent = user.data().incomecategory;
    tddob.textContent = user.data().incomeamount;

    divcontainer.appendChild(tdname);
    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);

    li.appendChild(divcontainer);
    userListincome.appendChild(li);

}

const queryforlist = incomesubcollection.orderBy('date','desc').limit(5);
queryforlist.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelist(user);
    });


});

//total income
const queryforlistincome = incomesubcollection.orderBy('date','desc');
var totalincome = 0;
queryforlistincome.get().then(snapshot => {
    snapshot.forEach(user => {
        totalincome= totalincome + parseInt(user.data().paidamount)
        console.log(totalincome);
    });
    document.getElementById('totalincome').innerHTML = totalincome;
});


//-----------------------------today income----------------------------------------
var todaYdateforincome =moment().format("YYYY-MM-DD").toString();
var totaltodayincome =0;
const queryforlastmonthincome = incomesubcollection.where('date','==',todaYdateforincome);
queryforlastmonthincome.get().then(snapshot => {
    snapshot.forEach(user => {
        totaltodayincome= totaltodayincome + parseInt(user.data().incomeamount);
    });
    document.getElementById('todayincome').innerHTML = totaltodayincome;
});

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
const userListexpense = document.querySelector('#showexpenselist');

const maincollectionexpense = database.collection('accounts');
const expensesubcollection = maincollectionexpense.doc('2').collection('expense');
function renderincomelistex(user){
    let li = document.createElement('li');
    let divcontainer =document.createElement('div');
    let tdidnumbeer = document.createElement('div');
    let tdcategory = document.createElement('div');
    let tddob = document.createElement('div');

    divcontainer.setAttribute("class","list_flex");
    tddob.setAttribute("class","list_flex_value");
    tdidnumbeer.setAttribute("class","list_flex_value");
    tdcategory.setAttribute("class","list_flex_value");

    li.setAttribute('data-id', user.id);
    tdidnumbeer.textContent = user.data().date;
    tddob.textContent = user.data().expensetitle;
    tdcategory.textContent = user.data().expenseamount;

    divcontainer.appendChild(tdidnumbeer);
    divcontainer.appendChild(tddob);
    divcontainer.appendChild(tdcategory);

    li.appendChild(divcontainer);
    userListexpense.appendChild(li);

}

const queryforlistex = expensesubcollection.orderBy('date','desc').limit(5);
queryforlistex.get().then(snapshot => {
    snapshot.forEach(user => {
        renderincomelistex(user);
    });

});
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
//-----------------------today Expense--------------------------------------------

var maindateforexpense = moment().format("YYYY-MM-DD").toString();
var todayexpense =0;

const queryforlastmonthexpense = expensesubcollection.where('date','==',maindateforexpense);
queryforlastmonthexpense.get().then(snapshot => {
    snapshot.forEach(user => {
        todayexpense= todayexpense + parseInt(user.data().expenseamount);
    });
    document.getElementById('todayexpense').innerHTML = todayexpense;
});

//===========================================laat month expense========================

var totallastmonthexpense= 0;
const queryformonthexpense = expensesubcollection.where('date','>=',maindateforlastmonthincome).where('date','<=',maindateforlastmonthincomeend);
queryformonthexpense.get().then(snapshot => {
    snapshot.forEach(user => {
        totallastmonthexpense= totallastmonthexpense + parseInt(user.data().expenseamount);
    });
    document.getElementById('lastmonthexpense').innerHTML = totallastmonthexpense;
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
            if (currentbalancetotal>0){
                document.getElementById('due').innerHTML = "0";
            }else {

                document.getElementById('due').innerHTML = currentbalancetotal.toString();
            }
        });

    });


}
currentbalance();